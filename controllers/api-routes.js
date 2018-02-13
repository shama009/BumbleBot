const Liri = require("../liri/liri");
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
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, (req, res)=> {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', (req, res) =>{
        req.logout();
        res.redirect('/');
    });

    //====================================================
    // make it a post request
    app.get("/api/twitter/:id/:method/:input", (req, res) => {
        console.log(`endpoint hit`);
        db.User.findOne({
            id: req.params.id
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

                // let client = new Liri(data);
                let client = new Liri(configAuth.consumerKey, configAuth.consumerSecret, data.twitter.token,data.twitter.tokenSecret, 'cat_retweets');
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
