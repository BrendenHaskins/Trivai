import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import url from 'url';
import router from './routers/router.js'

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

export default {
    portableDirectory,
    portableKey
};
