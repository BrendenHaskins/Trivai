import { 
    homePage, 
    pretestInputPage,
    testOne,
    testTwo,
    resultsPage, 
    fileNotFoundPage,
} from "/components.js";

import {
    getQuestions,
    pathParser
} from "/utils.js";

export const home = () => {
    return homePage();
}

// Micro router/controller for test paths
export const test = async (path) => {
    const route = pathParser(path);
    const res2 = await getQuestions("");
    switch (route[0][1]) {
        case "pretest": // Sync
            return pretestInputPage();

        case "test-1": // Async
            const pretestInput = document.getElementById("pretest-input");
            const reqBody = {
                media: pretestInput['media'].value,
                genre: pretestInput['genre'].value,
            };

            // const aiGen = await $.post("/generate", reqBody); // "Prod"
            const aiGen = ""; // "Test"

            const res = await getQuestions(aiGen);
            return testOne(res);

        case "test-2":
            return testTwo(res2);

        default:
            return pretestInputPage();
    }
}

export const results = () => {
    return resultsPage([""]); //
}

export const fileNotFound = (path) => {
    return fileNotFoundPage(path);
}