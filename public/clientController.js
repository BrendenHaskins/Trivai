import { homePage, pretestInputPage, resultsPage, fileNotFoundPage } from "/components.js";
/*
    Not in serious use yet, but will be nice to have a layer that 
    separates presentation from state management.
*/

export const home = () => {
    return homePage();
}

export const test = (subroute) => {
    switch (subroute) {
        case "pretest":
            return pretestInputPage();
        case "test-1":
            return testPartOne();
        case "test-2":
            return testPartTwo();
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