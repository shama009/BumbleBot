// import { read } from "fs";
const Bumbler = require("../liri/commands");
const Liri = require("../liri/liri");
const configAuth = require('../config/auth');
const path = require("path");
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');

}

module.exports = function (app, db, passport) {

    // user registration route
    app.post("/api/user", (req, res) => {
        // console.log("Req.body: " + JSON.stringify(req.body));
        db.User
            .create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(422).json(err));
    });
    //user login route
    app.post("/api/users", (req, res) => {
        console.log("User Req: " + req.body);
        db.User
            .findOne(req.body)
            .then(userData => {
                console.log("User Data: " + userData);
                res.json(userData);
            })
            .catch(err => res.status(422).json(err));
    });

    // LOGOUT ==============================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    // temporary routes ===============================================================
    //====================================================

    app.post("/api/commands", (req, res) => {
        console.log(req.body);
        db.Command.find({
            "user_id": req.body.id
        })
        .then(commands => res.send(commands))
        .catch(err => console.log(err));
    });

    app.post("/api/getTweets", (req, res) => {
        console.log("test: " + req.body.id);
        db.User.findOne({
                "twitter.id": req.body.id
            })
            .then(data => {

                let client = new Liri(
                    configAuth.twitterAuth.consumerKey,
                    configAuth.twitterAuth.consumerSecret,
                    data.twitter.token,
                    data.twitter.tokenSecret,
                    data.twitter.username
                );

                client.init();
                client.get(null, tweets => {
                    res.json(tweets);
                });
            }).catch(err => {
                console.log(err);
            })
    });

    app.post("/api/twitter", (req, res) => {
        console.log(`endpoint hit`);
        if (req.body.method === "stop") {
            let commandId = req.body.input;
            this[commandId].handler({
                active: false
            });
            console.log(this[commandId])
            return
        } else {
            db.User.findOne({
                    "twitter.id": req.body.id
                })
                .then(data => {

                    console.log("data: " + data);

                    let client = new Liri(
                        configAuth.twitterAuth.consumerKey,
                        configAuth.twitterAuth.consumerSecret,
                        data.twitter.token,
                        data.twitter.tokenSecret,
                        data.twitter.username
                    );
                    client.init();

                    let id = Date.now();
                    this[id] = new Bumbler(id, data.twitter.id, req.body.method, req.body.input, req.body.interval);

                    this[id].store();
                    this[id].initialize(client);
                    this[id].handler({
                        active: true
                    });

                    res.json(this[id].id);

                })
                .catch(err => console.log(err));
        }
    });

    // // passport twitter --------------------------------
    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback', (req, res, next) => {
        passport.authenticate('twitter', (err, user, info) => {
            if (!user) {
                res.redirect("/auth/twitter");
            } else {
                console.log(user);
                res.cookie("user", JSON.stringify(user));
                res.redirect("https://bumble-bot.herokuapp.com/home");
                // res.redirect("http://localhost:3000/home");

            }
        })(req, res, next)
    });
}


// app.get('/login', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info) {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return res.redirect('/login');
//         }
//         req.logIn(user, function (err) {
//             if (err) {
//                 return next(err);
//             }
//             return res.redirect('/users/' + user.username);
//         });
//     })(req, res, next);
// });
