const book =
`
book {
    title
    author
    isNewYorkTimesBestSeller
    copiesSold
    oneSentencePlotSummary
}
`;

const movie = 
`
movie {
    title
    director
    starringActor
    boxOfficeRevenue
    yearReleased
    oneSentencePlotSummary
}
`;

const game = 
`
game {
    title
    developer
    yearReleased
    plot
}
`;

const album = 
`
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

export default getJsonStringTemplate;