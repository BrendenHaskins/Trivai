import { home, test, results, fileNotFound } from "/clientController.js";
import { pathParser, routeParser } from "/utils.js";

/*
    I went a overboard with my frontend architecture since I wanted an excuse 
    to explore some of the more technical aspects of non-react SPAs a bit further. 
    If anything is hard to follow, just let me know and I can clarify.
    - Ethan
*/

const parser = new DOMParser();
const toHTML = (htmlBlock) => {
    const tempDoc = parser.parseFromString(htmlBlock, 'text/html');
    return tempDoc.body.childNodes;
}

window.addEventListener("DOMContentLoaded", () => {

    // Default route
    let currentPath = "/home";

    // Client-side router
    window.getPage = async (path) => {
        let routeFunction;
        const routes = {
            "home": () => home(currentPath),
            "test": async () => await test(currentPath),
            "results": () => results(currentPath),
        };

        const [route, relative] = pathParser(path); // Get array (pagination) from string (path)
        if (relative) {
            // If relative path such as ./test-1, append one level up
            const [currentRoute, ] = pathParser(currentPath);
            currentRoute.splice(-1);
            currentPath = routeParser([...currentRoute, ...route]); // Append new route to current route (at same level)
            routeFunction = routes[pathParser(currentPath)[0][0]];
        } else {
            if (route[0] in routes) {
                currentPath = routeParser(route);
                routeFunction = routes[pathParser(currentPath)[0][0]];
            }
            else {
                // Otherwise 404
                routeFunction = fileNotFound(getCurrentPath);
            }
        }

        const routeHTML = await routeFunction();
        root.innerHTML = '';
        root.append(...toHTML(routeHTML));
    };

    //On document load, render homepage
    const root = document.getElementById("root");
    window.getPage(currentPath);
});
