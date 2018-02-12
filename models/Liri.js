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

LiriSchema.methods.initTwitter = function () {

    this.client = new Twitter({
        consumer_key: this.consumer_key,
        consumer_secret: this.consumer_secret,
        access_token_key: this.access_token_key,
        access_token_secret: this.access_token_secret
    });
};

// LiriSchema.methods.get = function (search, callback) {

//     if (search) {

//         this.client.get('search/tweets', {
//             q: search,
//             count: 1
//         }, function (error, tweets, response) {

//             console.log("TWEET HISTORY (NEWEST TO OLDEST)");

//             callback(tweets);

//         });

//     } else {

//         this.twitter.client.get('search/tweets', {
//             q: 'notthebotuwant'
//         }, function (error, tweets, response) {
//             if (error) {
//                 console.log(error);
//                 return
//             }

//             console.log("MY TWEET HISTORY (NEWEST TO OLDEST)");

//             for (let i = 0; i < tweets.statuses.length; i++) {

//                 console.log("TWEET " + i + ": " + tweets.statuses[i].text);
//             }
//         });
//     }
// };

var Liri = mongoose.model("Liri", LiriSchema);

module.exports = Liri;