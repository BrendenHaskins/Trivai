import { home, test, results, fileNotFound } from "/components.js";

const parser = new DOMParser();
const toHTML = (htmlBlock) => {
    const tempDoc = parser.parseFromString(htmlBlock, 'text/html');
    return tempDoc.body.childNodes;
}

window.addEventListener("DOMContentLoaded", () => {
    // Client-side router
    window.getPage = (pageName) => {
        let pageHTML;
        const nameToHTML = {
            "home": home(),
            "test": test(),
            "results": results(),
        };

        if (pageName in nameToHTML) {
            currentPage = pageName;
            pageHTML = nameToHTML[pageName];
        }
        else {
            pageHTML = fileNotFound(currentPage);
        }

        root.innerHTML = '';
        root.append(...toHTML(pageHTML));
    };

    //On document load, render homepage
    const root = document.getElementById("root");
    let currentPage = "home";
    window.getPage(currentPage);
});
