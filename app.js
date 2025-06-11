import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config({
    path: "./.env"
})

const {PORT, KEY} = process.env;

app.get("/", (req,res) => {
    res.status(200);
    res.send("you've reached trivai")
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
