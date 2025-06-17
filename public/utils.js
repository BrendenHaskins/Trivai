import state from "/state.js";

export const getQuestions = async () => {

    // // Test data
    // Sample question input data looks like: 
    // questions = [
    //     ["Iron Man"],
    //     ["Robert De Niro"],
    //     ["1997"],
    //     ["Quinten Tarentino"],
    //     ["Titanic"],
    // ];
    //
    // // Sample question response data looks like:
    // const res = [
    //     ["Iron Man", "Thor", "Captain America", "Avengers", "What movie was the entry point into the MCU?"],
    //     [1997, 1998, 1999, 2000, "What was the year of Titanic's theatrical release?"],
    //     ["Quinten Tarentino", "Christopher Nolan", "Martin Scorsese", "Steve Spielberg", "Who directed Pulp Fiction?"],
    //     ["Chris Hemsworth", "Leonardo DiCaprio", "Chris Evans", "Chris Pratt", "Who is the lead in 'Thor'?"],
    //     ["2.8B", "1B", "2.5B", "1.5B", "How much did 'Avengers: Endgame' make at the box office?"],
    // ];

    // Serial - Use if getting rate limited
    // const res = [];
    // for (const media of inputMedia) {
    //     const question = await fetch('/question', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json' },
    //         body: JSON.stringify({ mediaObject: media }),
    //     })
    //     .then((res) => res.json());
    //     res.push(question[0]);
    // }

    const payload = {};

    if (state.questions.length > 1) {
        const percentCorrect = state.results.reduce((grade, cur) => {
            return grade + (cur.answer === cur.correct ? 1 : 0);
        }) / state.results.length;
        payload["difficulty"] = percentCorrect > 0.5 ? "hard" : "easy";
        payload["previous"] = state.questions;
    }
    payload["mediaType"] = state.pretest.media;

    console.log(payload);

    // Parallel - use for faster load times
    const res = await Promise.all(
        Object.values(state.inputMedia).map((media) =>
            fetch('/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, mediaObject: media }),
            }).then((res) => res.json())
            .then((res) => state.questions.push(res[0]))
        )
    );
    console.log(state.questions);
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