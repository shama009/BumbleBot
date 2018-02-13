const express      = require("express");
const path         = require("path");
const morgan       = require("morgan");
const mongoose     = require("mongoose");
const bp           = require('body-parser');
const passport     = require('passport');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.use(express.static("client"));



// app.set('view engine', 'ejs');

app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', 
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/liri");
require('./config/passport')(passport);
const db = require("./models");

require('./controllers/api-routes.js')(app, db, passport);

app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./client/build/index.html")));

app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`));
