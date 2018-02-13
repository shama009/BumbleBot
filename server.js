<<<<<<< HEAD
const express      = require("express");
const path         = require("path");
const morgan       = require("morgan");
const mongoose     = require("mongoose");
const bp           = require('body-parser');
const passport     = require('passport');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');

=======
const express  = require("express");
const path     = require("path");
const logger   = require("morgan");
const mongoose = require("mongoose");
const bp       = require('body-parser');
const passport = require('passport');
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
>>>>>>> master
const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
<<<<<<< HEAD

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
=======
// set up our express application
app.use(logger('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
>>>>>>> master
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
mongoose.connect("mongodb://localhost/liri");
<<<<<<< HEAD
require('./config/passport')(passport);
const db = require("./models");

require('./controllers/api-routes.js')(app, db, passport);

app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
=======
require('./config/passport')(passport); // pass passport for configuration

const db = require("./models");

require('./controllers/api-routes.js')(app, db, passport);
>>>>>>> master

// app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./client/build/index.html")));

app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`));
