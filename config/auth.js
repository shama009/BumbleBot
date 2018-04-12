// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'twitterAuth' : {
        'consumerKey'        : 'VDPgSyJ8vMjSn0PjAZBtQgdPO',
        'consumerSecret'     : '94h1wLHTXPIc3btcZQoBiofmzNbUs2nrUG9c3vUOPsTFcUv3BC',
        'callbackURL'        : 'https://bumble-bot.herokuapp.com/auth/twitter/callback'
        //'callbackURL'        : 'http://127.0.0.1:3001/auth/twitter/callback'
         //'consumerKey'        : process.env.consumerKey,
        // 'consumerSecret'     : process.env.consumerSecret,
         //'callbackURL'        : '/auth/twitter/callback'
    }
};
