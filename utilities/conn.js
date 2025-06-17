import mediaUtil from "./mediaTypes.js";

//no god fearing society should make me write my own wait function 
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sends a request to the Groq service
 * @param {String} prompt the prompt to send
 * @param {String} key authorization key
 * @returns the response content
 */
async function groqQuery(prompt, key) {
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const data = {
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    messages: [
      {
        role: 'user',
        content: `${prompt}`,
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    console.log(`JSON received: ${JSON.stringify(json)}`);
    const response = json.choices[0].message.content ?? "No response found...";
    return response;

  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

/**
 * Constructs a prompt to make a call to Groq via groqQuery() with the aim of getting media JSON back
 * @param {*} media the media type (see mediaTypes.js)
 * @param {*} genre the genre of that media
 * @param {*} key the api key to pass
 * @param {*} backoff wait time in ms
 * @param {*} prev titles already returned
 * @returns an object with four medias contained within it.
 */
async function generateJSON(media, genre, key, prev) {
  const promptStr = mediaUtil.getPrompt(media,genre,prev);

  return requestLayer(promptStr,0,key);
}

/**
 * Constructs a prompt to make a call to Groq via groqQuery() with the aim of getting question JSON back
 * @param {*} mediaObject the mediaObject JSON to base the questions
 * @param {*} key the api key to pass
 * @param {*} backoff wait time in ms
 * @param {*} prev titles already returned
 * @returns an object with array field containing a correct answer, three incorrect answers, and a question
 */
async function generateQuestion(mediaObject, key, prev, difficultyModifier) {
  const promptStr = mediaUtil.getQuestionPrompt(mediaObject, prev, difficultyModifier);

  return requestLayer(promptStr,0,key);
}

/**
 * Layer of abstraction to allow question and media requests to implement backoff and simple error handling
 * @param {*} prompt LLM prompt
 * @param {*} backoff current backoff in ms 
 * @param {*} key api key
 * @returns the parsed output from Groq
 */
async function requestLayer(prompt, backoff, key) {
    let output;
    let parsed;

    try {
      output = await groqQuery(prompt, key);
    } catch (err) {
      //groq service did not respond - incrementally backoff
      const ensuredBackoff = Math.max(backoff, 100);
      const newBackoff = ensuredBackoff*2;

      console.log(`Error in groqQuery (curr backoff ${newBackoff}): ${err}`);

      if(newBackoff > 60000) {
       //no reasonable person should be expected to wait an entire minute. at this point we're cooked
       throw new Error("Could not reach Groq service!");
      }

      await wait(newBackoff);
      return requestLayer(prompt, newBackoff, key);
    }
    try {
      let clean = cleanReponse(output)
      parsed = JSON.parse(clean)
    } catch (err) {
      //groq service responds - but it is not JSON parsable. smaller backoff
      const ensuredBackoff = Math.max(backoff, 100);
      const newBackoff = ensuredBackoff+10;


      console.log(`Error in parse (curr backoff ${newBackoff}): ${err}`);

      if(newBackoff > 60000) {
       //ditto
       throw new Error("Groq refused to return a parsable response...");
      }

      await wait(newBackoff)
      return requestLayer(prompt, newBackoff, key)
    }

    return parsed;
}

/**
 * cleans groq service responses of back ticks or whitespace
 * @param {String} response the response from Groq service
 * @returns the response, now ready to be parsed
 */
function cleanReponse(response) {
  return response
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/, '')              
    .trim();
}

export default {
  generateJSON,
  generateQuestion
};