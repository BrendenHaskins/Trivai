const questionJSONTemplate = `
[
    question = [
        ["Correct Answer", "Incorrect Answer", "Incorrect Answer", "Incorrect Answer", "Question"]
    ]
]
`

// const exampleQuestion = `
// [
//     questions = [
//         ["Star Wars", "Dune", "Star Trek", "Halo", "What Sci-Fi Series did George Lucas create?"]
//     ]
// ]
// `
//For some reason this produces more consistent results
const exampleQuestion = `
    ["Star Wars", "Dune", "Star Trek", "Halo", "What Sci-Fi Series did George Lucas create?"]
`

const book = `
book {
    title
    author
    isNewYorkTimesBestSeller
    copiesSold
    oneSentencePlotSummary
}
`;

const bookAttr = [
    "author",
    "isNewYorkTimesBestSeller",
    "copiesSold",
    "oneSentencePlotSummary",
];

const movie = `
movie {
    title
    director
    starringActor
    boxOfficeRevenue
    yearReleased
    oneSentencePlotSummary
}
`;

const movieAttr = [
    "director",
    "starringActor",
    "boxOfficeRevenue",
    "yearReleased",
    "oneSentencePlotSummary",
];

const game = `
game {
    title
    developer
    yearReleased
    engine
    oneSentencePlotSummary
}
`;

const gameAttr = [
    "developer",
    "yearReleased",
    "engine",
    "oneSentencePlotSummary",
];

const album = `
album {
    title
    artist
    length
    numberOfTracks
    copiesSold
    yearReleased
}
`;

const albumAttr = [
    "artist",
    "length",
    "numberOfTracks",
    "copiesSold",
    "yearReleased",
];

function getJsonStringTemplate(media) {
    switch (media) {
        case "book":
            return book;
        case "movie":
            return movie;
        case "game":
            return game;
        case "album":
            return album;
        default:
            throw new Error(`No such media: ${media}`);
    }
}

function getStringAttributes(media) {
    switch (media) {
        case "book":
            return bookAttr;
        case "movie":
            return movieAttr;
        case "game":
            return gameAttr;
        case "album":
            return albumAttr;
        default:
            throw new Error(`No such media: ${media}`);
    }
}

/**
 * @deprecated specific prompting is no longer used.
 */
function getSpecificPrompt(media) {
    let specific = "";
    switch (media) {
        case "book":
            specific = `
            - Use only real book titles and authors.
            - Plot summaries must match the real book.
            - Generate only one correct boolean value for "isNewYorkTimesBestSeller".
            - "CopiesSold" should be plausible and grounded in real-world figures for books.
            `;
            break;
        case "movie":
            specific = `
            - Use only real movie titles, directors, and starring actors.
            - "YearReleased" should not be later than ${currentYear}.
            - Plot summaries must match the real movie.
            - "BoxOfficeRevenue" should be realistic and appropriate for the film's popularity.
            `;
            break;
        case "game":
            specific = `
            - Use only real game titles and developers.
            - "YearReleased" must not be later than ${currentYear}.
            - "Plot" must accurately reflect the real game narrative.
            `;
            break;
        case "album":
            specific = `
            - Use only real album titles and artists.
            - "Length" and "NumberOfTracks" should match actual release data.
            - "CopiesSold" must reflect real or plausible sales numbers.
            - "YearReleased" must not be later than ${currentYear}.
            `;
            break;
        default:
            throw new Error(`No specific prompt for media: ${media}`);
    }

    return specific;
}

function getPrompt(media, genre, previousTitles) {
    const numEntries = "nine";
    const prev = previousTitles ?? "None used yet";

    const prompt = `
    You are hosting a trivia night.

    Return only a **JSON Array** containing ${numEntries} ${media}s of the ${genre} genre.

    Do **not** include any explanation, text, or formatting outside the JSON.

    Do **not** include any of these previously used titles: ${prev}

    For each key in the following JSON template, use the **correct answer.**

    Here is the JSON structure you must follow for each of the ${numEntries} ${media}s:
    ${getJsonStringTemplate(media)}
    `;
    

    return prompt;
}

function getQuestionPrompt(mediaObject, previousQuestions, difficultyModifier, mediaType) {
    const prev = previousQuestions ?? "None used yet";

    let diff;
    switch(difficultyModifier) {
        case "easy":
            diff = "Please make the questions easier.";
        case "hard":
            diff = "Please make the questions more difficult.";
        default:
            diff = "";
    }
    
    // Generate a random attribute                                                              // This gets pinged for every question, so AI never has the context
    const mediaAttrs = getStringAttributes(mediaType);                                          // that ALL previous questions were about X attribute. This way,
    if ((mediaType === "book" || mediaType === "game") && Math.random() > .4) {                 // we manually introduce an element of randomness. Games & books
        const mediaAttr = mediaAttrs[mediaAttrs.length-1];                                      // also feel a little lacking, so basing them on the plot more often
    }                                                                                           // makes the questions feel more varied.
    const mediaAttr = mediaAttrs[Math.floor(Math.random() * mediaAttrs.length)];                

    const prompt = `
    You are hosting a trivia night.

    Given the provided object, generate a triva question. 

    ${diff}

    return only a ** JSON object** like so: ${questionJSONTemplate}

    Do **not** include any explanation, text, or formatting outside the JSON.

    Here's an example: ${exampleQuestion}

    Make all incorrect answers plausible, and do not insert any jokes.

    Create your question around the ${mediaAttr} attribute.

    Do not use any previously asked questions, or questions similar to these: ${prev}.

    Here is the object to base the question on. ${JSON.stringify(mediaObject, null, 2)}.
    `

    console.log(prompt);
    return prompt;
}

export default {
    getPrompt,
    getQuestionPrompt
};