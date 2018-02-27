// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'twitterAuth' : {
        'consumerKey'        : process.env.consumerKey,
        'consumerSecret'     : process.env.consumerSecret,
        'callbackURL'        : '/auth/twitter/callback'
    }
};
