const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

// app.use(bodyParser.urlencoded()); // x-www-form -urlencoded <form>

// this is a middleware to parse incoming json data
app.use(bodyParser.json()); //application/json

// to avoid CORS error (two different port server)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect(
    "mongodb+srv://sanatanghosh:Sanatan1997@cluster0-expressjs.vsm7g.mongodb.net/messages?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen("8080");
  })
  .catch((err) => {
    console.log(err);
  });
