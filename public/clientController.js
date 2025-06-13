import { homePage, testPage, resultsPage, fileNotFoundPage } from "/components.js";
/*
    Not in serious use yet, but will be nice to have a layer that 
    separates presentation from state management.
*/

export const home = () => {
    return homePage();
}

export const test = () => {
    return testPage();
}

export const results = () => {
    return resultsPage();
}

export const fileNotFound = (prevPage) => {
    return fileNotFoundPage(prevPage);
}