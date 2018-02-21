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

            // console.log("data" + data);

            let client = new Liri(
                configAuth.twitterAuth.consumerKey,
                configAuth.twitterAuth.consumerSecret,
                data.twitter.token,
                data.twitter.tokenSecret,
                data.twitter.username
            );
            console.log(data.twitter.username);
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

                // console.log("data" + data);

                let client = new Liri(
                    configAuth.twitterAuth.consumerKey,
                    configAuth.twitterAuth.consumerSecret,
                    data.twitter.token,
                    data.twitter.tokenSecret,
                    data.twitter.username
                );

                client.init();

                console.log(req.body);

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

                        setInterval(() => client.fav(req.body.input, info => console.log(client.access_token_key, info)), req.body.interval);
                        break;

                    case "stream":

                        client.stream(req.body.input, info => console.log(info));
                        break;

                    case "follow-listen":
                        client.followListen(message => console.log(message));
                        // res.send("Listening for follows");
                        break;

                    default:
                        res.send("err no method match");
                        break;
                }

                let correctedInt = req.body.interval / 10;
                res.json({
                    message: `Method ${req.body.method} with Input ${input} set to repeat every ${correctedInt} seconds.`
                });

                // res.json(client);
            })
            .catch(err => res.json(err));
    });

    // // passport twitter --------------------------------
    // app.get("/test", (req, res) => )
    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback', (req, res, next) => {
        passport.authenticate('twitter', (err, user, info) => {
            console.log(user);
            res.cookie("user", JSON.stringify(user));
            res.redirect("/home");
        })(req, res, next)
    });

    app.get("/test", (req, res) => {
        res.json({
            message: "test"
        });
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