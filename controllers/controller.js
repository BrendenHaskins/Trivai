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
    res.status(200);
    const media = req.body.media;
    const genre = req.body.genre;

    const result = await conn.generateJSON(media, genre, app.portableKey, 0, []);
    res.send(result);
}

export default {
    home,
    generate
};