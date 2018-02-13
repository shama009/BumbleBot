// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
    username         : String,
    password         : String,
    twitter          : {
        id           : String,
        token        : String,
        tokenSecret  : String,
        displayName  : String,
        username     : String
    }

});
module.exports = mongoose.model('User', userSchema);
