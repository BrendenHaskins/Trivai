const navbar = () => {
    const routes = ["home", "test"];

    const button = (route) => /*html*/`
        <a class="nav-link" href="#" onclick="getPage('${route}')">${route.charAt(0).toUpperCase() + route.slice(1)}</a>
    `;
    return /*html*/`
        <nav id="nav" class="nav bg-body-tertiary px-5 pt-2">
            ${routes.map(route => button(route)).join('')}
        </nav>
    `;
}

export const homePage = () => {
    return /*html*/`
        ${navbar()}
        <div id="home" class="text-center"> 
            <h1>Trivai</h1>
            <p>I paid a consultant four million dollars to come up with that name</p> <!-- Should've just had AI come up with it 🤦-->
            <button class="btn btn-primary" onclick="getPage('test')">Test</button>
        </div>
    `;
};


const field = (name, value) => /*html*/`
    <label><input type="radio" name="${name}" value="${value}" required> ${value.charAt(0).toUpperCase() + value.slice(1)}</label><br>
`;

const fieldSet = (name, values) => /*html*/`
    <fieldset> 
        <legend>Choose a ${name}:</legend>
        ${values.map((value) => field(name, value)).join('')}
    </fieldset>
    <br>
`;

export const pretestInputPage = () => {
    return /*html*/`
        ${navbar()}
        <div id="pretest" class="text-center">
            <h1>Development Test</h1>
            <form action="#" id="pretest-input">
            ${fieldSet("media",["book","game","album","movie"])}
            ${fieldSet("genre",["fantasy","sci-fi","drama","comedy"])}
            <button onclick="getPage('test', 'test-1')">Submit</button>
            </form>
        </div>
    `;
}

export const testBody = (items) => {
    return /*html*/`
        ${navbar()}
        <pre>${JSON.stringify(items, null, 2)}</pre>
    `;
}

export const resultsPage = () => {
    return /*html*/`
    `;
}

export const fileNotFoundPage = (prevPage) => {
    return /*html*/`
        ${navbar()}
        <div id="file-not-found" class="text-center">
            <h1>Uh oh! That page couldn't be found.</h1>
            <button class="btn btn-primary" onclick="getPage(${prevPage})">Back</button>
            <button class="btn btn-primary" onclick="getPage('home')">Home</button>
        </div>
    `;
}