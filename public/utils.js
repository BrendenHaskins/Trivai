export const getQuestions = async (aiGen) => {

    // "Prod"
    // const attributes = Object.values(aiGen)[0]; // Get attributes
    // const keys = Object.keys(attributes);
    // let questions;
    // for(let i = 0; i < 5; i++) {
    //     const attribute = keys[Math.floor(Math.random() * keys.length)];
    //     const values = attributes[attribute];
    //     const value = values[Math.floor(Math.random() * values.length)];
    //     questions = [...questions, [value]];
    // }
    //
    // const res = await $.post('generate/test-1', questions);

    // "Test"
    // Sample question input data looks like: 
    // questions = [
    //     ["Iron Man"],
    //     ["Robert De Niro"],
    //     ["1997"],
    //     ["Quinten Tarentino"],
    //     ["Titanic"],
    // ];

    // "Test"
    // Sample question response data looks like:
    const res = [
        ["Iron Man", "Thor", "Captain America", "Avengers", "What movie was the entry point into the MCU?"],
        [1997, 1998, 1999, 2000, "What was the year of Titanic's theatrical release?"],
        ["Quinten Tarentino", "Christopher Nolan", "Martin Scorsese", "Steve Spielberg", "Who directed Pulp Fiction?"],
        ["Chris Hemsworth", "Leonardo DiCaprio", "Chris Evans", "Chris Pratt", "Who is the lead in 'Thor'?"],
        ["2.8B", "1B", "2.5B", "1.5B", "How much did 'Avengers: Endgame' make at the box office?"],
    ];

    return res;
}

export const pathParser = (path) => {
    let relative = false;
    if (path[0] == ".") {
        path = path.slice(2);
        relative = true;
    }
    return [path.split('/').filter(Boolean), relative];
}

export const routeParser = (route) => {
    return "/" + route.join('/');
}