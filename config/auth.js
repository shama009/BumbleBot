// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'twitterAuth' : {
        'callbackURL'        : 'https://bumble-bot.herokuapp.com/auth/twitter/callback',
         'consumerKey'        : process.env.consumerKey,
         'consumerSecret'     : process.env.consumerSecret
         
    }
};
