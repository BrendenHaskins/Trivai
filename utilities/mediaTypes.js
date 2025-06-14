const book = `
book {
    title
    author
    isNewYorkTimesBestSeller
    copiesSold
    oneSentencePlotSummary
}
`;

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

const game = `
game {
    title
    developer
    yearReleased
    plot
}
`;

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

function getPrompt(media, genre, previousTitles) {
    const currentYear = new Date().getFullYear();
    const prev = "";
    if(Array.isArray(previousTitles && previousTitles.length > 0)) {
        prev = JSON.stringify(previousTitles, null, 2);
    }

    const shared = `
    You are hosting a trivia night.

    Return only a **single JSON object** related to the **${genre}** genre and based on the **${media}** format.

    Do **not** include any explanation, text, or formatting outside the JSON.

    Do **not** include any of these titles: ${prev}

    For each key in the following JSON template:
    - Generate an array of four values.
    - The **correct answer must come first**, followed by **three realistic but incorrect alternatives**.
    - All values should be plausible within the given genre and media.

    Here is the JSON structure you must follow:
    ${getJsonStringTemplate(media)}
    `;

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

    return shared + specific;
}

export default getPrompt;