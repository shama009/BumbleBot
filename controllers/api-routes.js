const Liri = require("../liri/liri");
const path = require("path");
const auth = require("../config/auth");

module.exports = function (app, db, passport) {

    app.get('/', (req, res) => {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

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
            .then(data => {
                console.log(data.twitter.access_token_key);
                
                let client = new Liri(
                    auth.twitterAuth.consumerKey,
                    auth.twitterAuth.consumerSecret,
                    data.twitter.token,
                    data.twitter.tokenSecret,
                    data.screenName
                );

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
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}