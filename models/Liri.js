const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Twitter = require("twitter");


const LiriSchema = new Schema({

    screenName: {
        type: String,
        trim: true,
        required: "Screen Name is Required"
    },
    consumer_key: {
        type: String,
        trim: true,
        required: "Required"
    },
    consumer_secret: {
        type: String,
        trim: true,
        required: "Required"
    },
    access_token_key: {
        type: String,
        trim: true,
        required: "Required"
    },
    access_token_secret: {
        type: String,
        trim: true,
        required: "Required"
    },
    client: {
        type: Object
    }
});

var Liri = mongoose.model("Liri", LiriSchema);

module.exports = Liri;