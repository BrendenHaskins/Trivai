import app from "../app.js";
import conn from '../utilities/conn.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const home = (req,res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};

const generate = async (req,res) => {
    const media = req.body?.media;
    const genre = req.body?.genre;
    const previous = req.body?.previous ?? [];

    if(!media || !genre || Math.min(media.length, genre.length) == 0) {
        return res.status(400).send({ error: "incomplete request: expected media and genre"});   
    }

    try {
       const result = await conn
       .generateJSON(media, genre, app.portableKey, previous);

       res.status(200).send(result);
    } catch(err) {
       res.status(500).send({ error: `internal error: ${err}`});
    }
}

const question = async (req,res) => {
    const mediaObject = req.body?.mediaObject;
    const previous = req.body?.previous ?? [];
    const difficultyModifier = req.body?.difficulty ?? ""; 
    const mediaType = req.body?.mediaType;

    if(!mediaObject || mediaObject.length == 0) {
        return res.status(400).send({ error: "incomplete request: expected mediaObject"});   
    }

    try {
       const result = await conn
       .generateQuestion(mediaObject, app.portableKey, previous, difficultyModifier, mediaType);

       res.status(200).send(result);
    } catch(err) {
       res.status(500).send({ error: `internal error: ${err}`});
    }
}

export default {
    home,
    generate,
    question
};