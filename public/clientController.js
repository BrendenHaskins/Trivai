import { 
    homePage, 
    pretestInputPage,
    testBody,
    resultsPage, 
    fileNotFoundPage,
} from "/components.js";

export const home = () => {
    return homePage();
}

export const test = async (subroute) => {
    switch (subroute) {
        case "pretest": // Sync
            return pretestInputPage();

        case "test-1": // Async
            const pretestInput = document.getElementById("pretest-input");
            const reqBody = {
                media: pretestInput['media'].value,
                genre: pretestInput['genre'].value,
            };
            const res = await $.post("/generate", reqBody);
            return testBody(res);

        case "test-2":
            return testBody();
            
        default:
            return pretestInputPage();
    }
}

export const results = () => {
    return resultsPage();
}

export const fileNotFound = (prevPage) => {
    return fileNotFoundPage(prevPage);
}