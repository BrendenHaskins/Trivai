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
            state.clear();
            return pretestInputPage();

        case "test-1":
            const pretestInput = document.getElementById("pretest-input");

            state.pretest = {
                media: pretestInput['media'].value,
                genre: pretestInput['genre'].value,
            };

            state.inputMedia = await $.post("/generate", state.pretest); 
            await getQuestions();

            return testOne();

        case "test-2":
            document.querySelectorAll('input[name^="question-"]:checked').forEach((input, i) => {
                state.results.push({ 
                    question: state.questions[i][4], 
                    answer: input.value,
                    correct: state.questions[i][0],
                });
            });
            // state.questions = [...state.questions, await getQuestions()];
            await getQuestions();

            return testTwo();

        default:
            state.clear();
            return pretestInputPage();
    }
}

export const results = () => {
    const n = state.results.length; // Offset index by number of questions already answered
    document.querySelectorAll('input[name^="question-"]:checked').forEach((input, i) => {
        state.results.push({ 
            question: state.questions[i+n][4], 
            answer: input.value,
            correct: state.questions[i+n][0],
        });
    });

    return resultsPage(); //
}

export const fileNotFound = (path) => {
    return fileNotFoundPage(path);
}