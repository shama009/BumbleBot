const Liri = require("../liri/liri");
<<<<<<< HEAD
const path = require("path");
const auth = require("../config/auth");

module.exports = function (app, db, passport) {

    app.get('/', (req, res) => {
=======
const configAuth = require('../config/auth');
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
    
}
module.exports = function (app, db, passport) {
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', (req, res) =>{
>>>>>>> master
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
<<<<<<< HEAD
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user: req.user
=======
    app.get('/profile', isLoggedIn, (req, res)=> {
        res.render('profile.ejs', {
            user : req.user
>>>>>>> master
        });
    });

    // LOGOUT ==============================
<<<<<<< HEAD
    app.get('/logout', (req, res) => {
=======
    app.get('/logout', (req, res) =>{
>>>>>>> master
        req.logout();
        res.redirect('/');
    });

<<<<<<< HEAD
    app.get('/login', function (req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', {
        scope: 'email'
    }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    app.post("/api/twitter/:method/:input/:frequency", (req, res) => {
        console.log(`endpont hit`);
        db.User.findOne({
                _id: req.body.id
            })
=======
    //====================================================

    app.get("/api/twitter/:id/:method/:input", (req, res) => {
        console.log(`endpoint hit`);
        db.User.findOne({
            id: req.params.id
        })
>>>>>>> master
            .then(data => {
                console.log(data.twitter.access_token_key);
                
                let client = new Liri(
                    auth.twitterAuth.consumerKey,
                    auth.twitterAuth.consumerSecret,
                    data.twitter.token,
                    data.twitter.tokenSecret,
                    data.screenName
                );

<<<<<<< HEAD
=======
                // let client = new Liri(data);
                let client = new Liri(configAuth.consumerKey, configAuth.consumerSecret, data.twitter.token,data.twitter.tokenSecret, 'cat_retweets');
>>>>>>> master
                client.init();
                console.log(client);

                switch (req.params.method) {

                    case "get":
                        setInterval(() => client.get(req.params.input), req.params.frequency);
                        break;

                    case "post":
                        client.post(req.params.input);
                        break;

                    case "fav":
                        client.fav(req.params.input);
                        break;

                    default:
                        console.log("default");
                        break;
                }

                res.json(client);
            })
            .catch(err => res.json(err));
    });

    

    app.post("/api/twitter/clients/new", (req, res) => {
        // when a user submits a new bot
        console.log(db);

        db.Liri.create(req.body)
            .then(data => {
                console.log(data);
                res.json("done!")
            })
            .catch(err => console.log(err));
    });
<<<<<<< HEAD
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
=======
    // passport twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', { scope: 'email' }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));
    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope: 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));
    // unlink twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn,  (req, res) =>{
        var user = req.user;
        user.twitter.token = undefined;
        user.save((err)=> {
            if (err) throw err;
            res.redirect('/profile');
           //res.json(user.twitter.token);
        });
    });
}
>>>>>>> master
