const navbar = () => {
    const routes = ["home", "test"];

    const button = (route) => /*html*/`
        <a class="accent nav-link" href="#" onclick="getPage('${route}')">${route.charAt(0).toUpperCase() + route.slice(1)}</a>
    `;
    return /*html*/`
        <nav id="nav" class="accent nav px-5 py-2">
            ${routes.map(route => button(route)).join('')}
        </nav>
    `;
}

export const homePage = () => {
    return /*html*/`
        ${navbar()}
        <div id="home" class="text-center m-4"> 
            <h1>Trivai</h1>
            <p>I paid a consultant four million dollars to come up with that name</p> <!-- Should've just had AI come up with it 🤦-->
            <button type="button" class="btn btn-primary" onclick="getPage('test/pretest')">Test</button>
        </div>
    `;
};


const field = (name, value) => /*html*/`
    <label><input type="radio" name="${name}" value="${value}" required> ${value.charAt(0).toUpperCase() + value.slice(1)}</label><br>
`;

const fieldSet = (name, values) => /*html*/`
    <fieldset> 
        <legend>Choose a ${name}:</legend>
        ${values.map(value => field(name, value)).join('')}
    </fieldset>
    <br>
`;

export const pretestInputPage = () => {
    return /*html*/`
        ${navbar()}
        <div id="pretest" class="text-center m-4">
            <h1>Development Test</h1>
            <form action="#" id="pretest-input">
                ${fieldSet("media",["book","game","album","movie"])}
                <label>Enter a genre: (A single word works better!)<br>
                <input type="text" name="genre" required>
                </label>
                <button type="button" class="btn btn-primary" onclick="getPage('test/test-1')">Submit</button>
            </form>
        </div>
    `;
}

const answer = (answer, questionNum) => {
    return /*html*/`
        <label><input class="mx-2" type="radio" name="question-${questionNum}", value="${answer}" required> ${answer}</label>
    `;
}

const question = (item, questionNum) => {
    const seed = Math.floor(Math.random() * 4);
    const order =  [seed % 4, (seed + 1) % 4, (seed + 2) % 4, (seed + 3) % 4];
    return /*html*/`
        <div class="m-3">
            <h4>${item[item.length-1]}</h4>
            ${order.map(index => answer(item[index], questionNum)).join('<br>')}
        </div>
    `;
}

const testBody = (items, nextPage, message) => {
    return /*html*/`
        ${navbar()}
        <form id="test" class="text-center" style="padding-bottom: 30vh;">
            ${items.map((item, questionNum) => question(item, questionNum)).join('<br>')}
            <button type="button" class="btn btn-primary mt-5" onclick="getPage('${nextPage}')">${message}</button>
        </form>
    `;
}

export const testOne = (items) => {
    return testBody(items, "test/test-2", "Next Page");
}

export const testTwo = (items) => {
    return testBody(items, "results", "Submit");
}

const renderResult = (result) => {
    const [question, answer, correct] = result;
    return /*html*/`
        <tr>
            <td>${question}</td>
            <td>${answer}</td>
            <td>${correct}</td>
        </tr>
    `;
}

export const resultsPage = (results) => { // results = [ ["question", "playerAnswer", "correctAnswer"], ... ];
    return /*html*/`
        ${navbar()}
        <div id="results" class="container">
            <table class="accent-lite col table table-bordered p-2 mx-auto mt-4 w-50">
                <thead>
                    <tr>
                        <th class="col-4">❓ Question</th>
                        <th class="col-4">🙋 Your Answer</th>
                        <th class="col-4">✅ | ❌ Correct Answer</th>
                    </tr>
                </thead>
                <tbody>
                    ${results.map(result => renderResult(result)).join('')}
                </tbody>
            </table>

            <div class="d-flex justify-content-center"><button onclick="getPage('test')" class="btn btn-primary">Play Again</button></div>
        </div>
    `;
}

export const fileNotFoundPage = (prevPage) => {
    return /*html*/`
        ${navbar()}
        <div id="file-not-found" class="text-center">
            <h1>Uh oh! That page couldn't be found.</h1>
            <button type="button" class="btn btn-primary" onclick="getPage('${prevPage}')">Back</button>
            <button type="button" class="btn btn-primary" onclick="getPage('home')">Home</button>
        </div>
    `;
}