import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import url from 'url';
import generateJSON from './utilities/conn.js';
import testRouter from './routers/testRouter.js'

const app = express();

dotenv.config({
    path: "./.env"
})

const {PORT, KEY} = process.env;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portableKey = KEY;
const portableDirectory = __dirname;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/test', testRouter)

app.get("/", (req,res) => {
    res.status(200);
    res.send("you've reached trivai")
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

//const dev_test = await generateJSON.generateJSON("game", "shooter", KEY);
//console.log(dev_test);

export default {
    portableDirectory,
    portableKey
};
