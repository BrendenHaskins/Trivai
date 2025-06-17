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

import state from "/store.js";

export const home = () => {
    return homePage();
}

// Micro router/controller for test paths
export const test = async (path) => {
    const route = pathParser(path);
    switch (route[0][1]) {
        case "pretest":
            return pretestInputPage();

        case "test-1": // Async
            const pretestInput = document.getElementById("pretest-input");
            const reqBody = {
                media: pretestInput['media'].value,
                genre: pretestInput['genre'].value,
            };

            const inputMedia = await $.post("/generate", reqBody); 
            const questions = await getQuestions(inputMedia);

            state.questions = questions;
            state.inputMedia = inputMedia;

            return testOne(questions);

        case "test-2":
            // const testInputOne = document.getElementById("test");
            // document.querySelectorAll('input[name^="question-"]:checked').forEach((input, i) => {
            //     state.answers.push(input.value === state.questions[i][0]);
            // });
            // console.log(state.answers);
            return testTwo(res);

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