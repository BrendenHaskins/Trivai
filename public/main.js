import { home, test, results, fileNotFound } from "/clientController.js";

const parser = new DOMParser();
const toHTML = (htmlBlock) => {
    const tempDoc = parser.parseFromString(htmlBlock, 'text/html');
    return tempDoc.body.childNodes;
}

window.addEventListener("DOMContentLoaded", () => {

    // Default route
    let currentRoute = "home";

    // Client-side router
    window.getPage = (route, subroute) => {
        let routeHTML;
        const routes = {
            "home": home(),
            "test": test(subroute),
            "results": results(),
        };

        if (route in routes) {
            currentRoute = route;
            routeHTML = routes[route];
        }
        else {
            routeHTML = fileNotFound(currentRoute);
        }

        root.innerHTML = '';
        root.append(...toHTML(routeHTML));
    };

    //On document load, render homepage
    const root = document.getElementById("root");
    window.getPage(currentRoute);
});
