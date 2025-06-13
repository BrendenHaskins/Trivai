export const home = () => {
    return /*html*/`
        <div id="home" class="text-center"> 
            <h1>Trivai</h1>
            <p>I paid a consultant four million dollars to come up with that name</p> <!-- Should've just had AI come up with it 🤦-->
        </div>
    `;
};

export const test = () => {
    return /*html*/`
    `;
}

export const results = () => {
    return /*html*/`
    `;
}

export const fileNotFound = (prevPage) => {
    return /*html*/`
        <div id="file-not-found" class="text-center">
            <h1>Uh oh! That page couldn't be found.</h1>
            <button class="btn btn-primary" onclick="getPage(${prevPage})">Back</button>
            <button class="btn btn-primary" onclick="getPage('home')">Home</button>
        </div>
    `;
}