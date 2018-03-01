const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commandSchema = mongoose.Schema({
   
    id: String,
    user_id: String,
    data: {
        method: String,
        input: String,
        interval: String
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Command', commandSchema);
