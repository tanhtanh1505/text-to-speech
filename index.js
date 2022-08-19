require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const textToSpeech = require("./text-to-speech");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/text-to-speech", textToSpeech);

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Express server is listening on port ${port}`)
);
