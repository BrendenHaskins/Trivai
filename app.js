import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import groq_query from './conn.js';

const app = express();

dotenv.config({
    path: "./.env"
})

const {PORT, KEY} = process.env;


app.use(morgan('dev'));

app.get("/", (req,res) => {
    res.status(200);
    res.send("you've reached trivai")
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

const dev_test = await groq_query("This is a development test. Please respond with something witty.", KEY);
console.log(dev_test);
