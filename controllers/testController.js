import app from "../app.js";
import conn from '../utilities/conn.js';

const test = (req,res) => {
    res.status(200);
    //does this work for all platforms?
    res.sendFile(app.portableDirectory + "/views/test.html");
}

const home = (req,res) => {
    res.status(200);
    res.sendFile(app.portableDirectory + "/views/index.html");
}

const generate = async (req,res) => {
    res.status(200);
    const media = req.body.media;
    const genre = req.body.genre;

    const result = await conn.generateJSON(media, genre, app.portableKey, 0, []);
    res.send(result);
}

export default {
    test,
    home,
    generate
};