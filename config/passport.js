// load all the things we need
const TwitterStrategy  = require('passport-twitter').Strategy;
// load up the user model
const User       = require('../models/user');

// load the auth variables
const configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    (req, token, tokenSecret, profile, done) =>{
        // console.log(req.request);
        // console.log(token, tokenSecret);
        // asynchronous
        process.nextTick(function() {
            
            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'twitter.id' : profile.id }, (err, user) =>{
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.twitter.token) {
                            user.twitter.token       = token;
                            user.twitter.tokenSecret = tokenSecret;
                            user.twitter.username    = profile.username;
                            user.twitter.displayName = profile.displayName;

                            user.save((err) =>{
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        const newUser                 = new User();

                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.tokenSecret = tokenSecret;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;
                        console.log(newUser);
                        newUser.save((err) =>{
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                const user               = req.user; // pull the user out of the session

                user.twitter.id          = profile.id;
                user.twitter.token       = token;
                user.twitter.tokenSecret = tokenSecret;
                user.twitter.username    = profile.username;
                user.twitter.displayName = profile.displayName;
                

                user.save((err)=> {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });
            }

        });

    }));

};
