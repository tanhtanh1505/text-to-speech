require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const textToSpeech = require("./text-to-speech");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/text-to-speech", textToSpeech);

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Express server is listening on port ${port}`)
);
