// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
    username         : {
        type: String,
        unique: true
    },
    password         : {
        type: String,
<<<<<<< HEAD
        
=======
>>>>>>> master
    },
    twitter          : {
        id           : String,
        token        : String,
        tokenSecret  : String,
        displayName  : String,
        username     : String
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
