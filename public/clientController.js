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

import state from "/state.js";

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

            state.pretest = {
                media: pretestInput['media'].value,
                genre: pretestInput['genre'].value,
            };

            state.inputMedia = await $.post("/generate", state.pretest); 
            state.questions = await getQuestions(state.inputMedia);

            return testOne();

        case "test-2":
            document.querySelectorAll('input[name^="question-"]:checked').forEach((input, i) => {
                state.results.push({ 
                    question: state.questions[i][4], 
                    answer: input.value,
                    correct: state.questions[i][0],
                });
            });
            console.log(state.results);
            // Todo: Get more questions, make it easier/harder
            return testTwo();

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