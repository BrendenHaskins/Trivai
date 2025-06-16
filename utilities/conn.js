import getPrompt from "./mediaTypes.js";

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
 * Constructs a prompt to make a call to Groq via groqQuery()
 * @param {*} media the media type (see mediaTypes.js)
 * @param {*} genre the genre of that media
 * @param {*} key the api key to pass
 * @param {*} backoff wait time in ms
 * @param {*} previousTitles titles already returned
 * @returns an object with array fields according to that media type, with a correct value in position zero, followed by three fake values
 */
async function generateJSON(media, genre, key, backoff, previousTitles) {
  
  const promptStr = getPrompt(media,genre)

    let output;
    let parsed;
    try {
      output = await groqQuery(promptStr, key);
    } catch (err) {
      //groq service did not respond - incrementally backoff
      console.log(`Error in groqQuery: ${err}`);
      const newBackoff = Math.max(backoff,50) * 2

      if(newBackoff > 60000) {
       //no reasonable person should be expected to wait an entire minute. at this point we're cooked
       throw new Error("Could not reach Groq service!");
      }

      await wait(newBackoff);
      return generateJSON(media, genre, key, newBackoff, previousTitles);
    }
    try {
      let clean = cleanReponse(output)
      parsed = JSON.parse(clean)
    } catch (err) {
      console.log(`Error in parse: ${err}`);
      //groq service responds - but it is not JSON parsable. no need to backoff
      return generateJSON(media, genre, key, backoff)
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
  groqQuery,
  generateJSON
};