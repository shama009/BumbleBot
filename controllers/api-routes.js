// import { read } from "fs";

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

    app.post("/api/getTweets", (req, res) => {
        console.log(req.body.id);
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

                // console.log(client);

                switch (req.body.method) {

                    case "get":
                        if(req.body.interval) {
                            setInterval(() => client.get(req.body.input), req.body.interval);
                        }
                        else {
                            client.get(req.body.input);
                        }
                        break;
                        

                    case "post":
                        client.post(req.body.input, data => res.json(data));
                        break;

                    case "fav":
                        client.fav(req.body.input, data => res.json(data));
                        break;

                    case "follow-listen":
                        client.followListen(message => console.log(message));
                        res.send("Listening for follows");
                        break;

                    case "retweet":
                    console.log("hit");
                    console.log(req.body);
                        if(req.body.interval) {
                            setInterval(() => client.retweet(req.body.input), req.body.interval);
                        }
                        else {
                            client.retweet(req.body.input);
                        }
                        break;

                    default:
                        res.send("err no method match");
                        break;
                }

                // res.json(client);
            })
            .catch(err => res.json(err));
    });

    // passport twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback', (req, res, next) => {
        passport.authenticate('twitter', (err, user, info) => {
            console.log(user);
            res.cookie("user", JSON.stringify(user));
            res.redirect("/home");
        })(req, res, next)
    }
);

    app.get("/test", (req, res) => res.send("test"));

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