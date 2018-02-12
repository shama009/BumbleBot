const express  = require("express");
const path     = require("path");
const logger   = require("morgan");
const mongoose = require("mongoose");
const bp       = require('body-parser');

const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/liri");

const db = require("./models");

require('./controllers/api-routes.js')(app, db);

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./client/build/index.html")));

app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`));
