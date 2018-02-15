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
  
    // normal routes ===============================================================

// temporary routes ===============================================================

    app.post("/api/user", (req, res) => {
        // console.log("Req.body: " + JSON.stringify(req.body));
        db.User
            .create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(422).json(err));
    });

    app.post("/api/users", (req, res) => {
        console.log("User Req: " + req.body);
        db.User
            .findOne(req.body)
            .then(userData => {
                console.log("User Data: " + userData);
                res.json(userData);
            })
            .catch(err => res.status(422).json(err));
    })

    // show the home page (will also have our login links)
    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../views/test.html'));
    // });

    // // PROFILE SECTION =========================
    // app.get('/profile', isLoggedIn, (req, res) => {
    //     res.sendFile(path.join(__dirname, '../views/profile.html'));
    // });

    // LOGOUT ==============================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
// temporary routes ===============================================================
    //====================================================

    app.post("/api/twitter", (req, res) => {
        console.log(`endpoint hit`);
        db.User.findOne({
                _id: req.body.id
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

                console.log(client);

                switch (req.body.method) {

                    case "get":
                        // setInterval(() => client.get(req.params.input), 5000);
                        client.get(req.body.input, data => res.json(data));
                        break;

                    case "post":
                        client.post(req.body.input, data => res.json(data));
                        break;

                    case "fav":
                        client.fav(req.body.input, data => res.json(data));
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
    app.get('/auth/twitter', passport.authenticate('twitter', {
        scope: 'email'
    }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/home',
            failureRedirect: '/'
        }));
    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', {
        scope: 'email'
    }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));
    // unlink twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, (req, res) => {
        var user = req.user;
        user.twitter.token = undefined;
        user.save((err) => {
            if (err) throw err;
            res.redirect('/profile');
            //res.json(user.twitter.token);
        });
    });

}


