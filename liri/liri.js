const Twitter = require('twitter');
const moment = require('moment');
moment().format();

module.exports = class liri {

    constructor(consumer_key, consumer_secret, access_token_key, access_token_secret, screenName) {
        this.consumer_key = consumer_key;
        this.consumer_secret = consumer_secret;
        this.access_token_key = access_token_key;
        this.access_token_secret = access_token_secret;
        this.screenName = screenName;
        this.client = "";
    }

    // twitter module


    init() {
        this.client = new Twitter({
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            access_token_key: this.access_token_key,
            access_token_secret: this.access_token_secret,
            screenName: this.screenName,
        });
    }
    // create client object


    // posts to twitter
    post(status, callback) {
        this.client.post("statuses/update", {
            status: status
        }, function (error, tweet, response) {

            if (!error) {
                callback("Tweeted: " + tweet.text);

            } else {
                callback(error);
            }
        })
    }


    // search twitter
    get(search, callback) {

        // if (search) {

        this.client.get('search/tweets', {
            q: "cats",
            result_type: "recent"
            // result_type: "recent"
        }, (err, tweets, response) => {

            console.log("TWEET HISTORY (NEWEST TO OLDEST)");
            console.log(`FROM ${this.screenName}`);

            // for (let i = 0; i < tweets; i++) {

            console.log(tweets);
            // let response = {
            //     screen_name: this.screenName,
            //     text: tweets.statuses[i].text
            // };

            // console.log(response);

            callback(tweets);
            // }
        });
      
        } else {
            this.client.get('search/tweets', {
                q: this.screenName
            }, function (error, tweets, response) {
                if (error) {
                    console.log(error);
                    return
                }

                console.log("MY TWEET HISTORY (NEWEST TO OLDEST)");
                console.log(tweets);
                
                let data = {
                    tweets: tweets.statuses
                }
                callback(data);
            });
        }
    }

    // retweet tweets by search
    retweet(search) {
        console.log(search);
        this.client.get('search/tweets', {
            q: search,
            count: 1
        }, (error, tweets, response) => {

            console.log(tweets);

            // for (let i = 0; i < 1; i++) {

                // console.log("TWEET " + i + ": " + tweets.statuses[i].text);
                // console.log("TWEET ID " + i + ": " + tweets.statuses[i].id);


            if(tweets.statuses.length > 0) {
                var tweetId = tweets.statuses[0].id_str;
                
                    this.client.post("statuses/retweet/" + tweetId, function (error, tweet, response) {
                        if (!error) {
                            console.log("Tweeted: " + tweet.text);
    
                        } else {
                            console.log(error)
                        }
                    });
            }
            else {
                return;
            }
                
            // }
        });
    }

    add(user) {

        this.client.post("friendships/create", {
            screen_name: user
        }, function (err, response) {
            if (err) {
                console.log(err)
            }

            console.log(user + " is now followed!");
        })

    }

    followListen(callback) {
        var stream = this.client.stream('user');
        stream.on('follow', (event) => {
            var name = event.source.screen_name;
            if (name != this.screenName) {
                callback(name + " followed!");
                this.post("@" + name + " Thanks for following!", (msg) => {
                    console.log(typeof msg);
                    if (typeof msg == 'object') {
                        console.log("array");
                        console.log(msg[0]);
                    } else {
                        console.log("not array");
                        console.log(msg);
                    }
                    this.add(name);
                });

            } else {
                console.log("done");
                return
            }
        });
        // followed: (event) => {
        //     var name = event.source.screen_name;
        //     if (name != this.screenName) {
        //         callback(name + " followed!");
        //         this.client.post("@" + name + " Thanks for following!", (msg) => {
        //             console.log(msg)
        //         });
        //         this.client.add(name);
        //     } else {
        //         console.log("done");
        //         return
        //     }
        // }


    }

    fav(search, callback) {


        this.client.get("search/tweets", {
            q: search,
            count: 1,
            result_type: "recent"
        }, (error, tweets, response) => {
            if (!tweets.statuses[0]) {
                console.log(tweets);
                return
            } else {
                console.log(response.headers['x-rate-limit-remaining']);
                console.log(moment.unix(response.headers['x-rate-limit-reset']));
                var tweetext = (tweets.statuses[0].text);
                var id = (tweets.statuses[0].id_str);
                if (search) {
                    this.client.post("favorites/create", {
                        id: id
                    }, function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            console.log("tweet: " + tweetext + " favorited");

                            let response = {
                                text: tweets.statuses[0].text
                            };

                            // console.log(response);

                            callback(response);
                        }
                    })

                }
            }

        })
    }

    stream(search, callback) {

        // c: pls limit requests
        this.client.stream('statuses/filter', {
            track: search
        }, stream => {
            stream.on('data', (event) => {
                // console.log(event);
                console.log(event.id);
                var id = event.id_str;
                // liri.twitter.fav(id);
                this.client.post("favorites/create", {
                    id: id
                }, (err, data, response) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        // console.log(response);
                        callback("tweet: " + id + " favorited")
                    }
                })
                return;
            });

            stream.on('error', (error) => {
                error
            });
        });
    }
};

// console.log(new Liri("notthebotuwant", "MQjUzEMgEMqrxHKSR4AqkiRhT", "gGFT0pNpcbdAkh7hJhwrC7SRnKgqT9pubj3pZYWAvPoe7R3K9i", "942986559724314625-EnYoXOT4eEk6YkRqhvmfhxsrMnpT1gl", "0ZQSwPeB3zjjlcQVQuUNPJZWMzfebWu7nBEKHHv1dDWEq"));
// liri.twitter.followListen();

console.log("liri initiated");



// module.exports = {




//     // posts to twitter
//     post(client, status, callback) {

//         console.log(client, status, callback);
//         client.post("statuses/update", {
//             status: status
//         }, function (error, tweet, response) {

//             if (!error) {
//                 callback("Tweeted: " + tweet.text);

//             } else {
//                 console.log(error)
//             }
//         });
//     },

//     // // search twitter
//     // get(search, callback) {

//     //     if (search) {

//     //         this.client.get('search/tweets', {
//     //             q: search,
//     //             count: 1
//     //         }, function (error, tweets, response) {

//     //             console.log("TWEET HISTORY (NEWEST TO OLDEST)");

//     //             callback(tweets);

//     //         });

//     //     } else {

//     //         this.twitter.client.get('search/tweets', {
//     //             q: 'notthebotuwant'
//     //         }, function (error, tweets, response) {
//     //             if (error) {
//     //                 console.log(error);
//     //                 return
//     //             }

//     //             console.log("MY TWEET HISTORY (NEWEST TO OLDEST)");

//     //             for (let i = 0; i < tweets.statuses.length; i++) {

//     //                 console.log("TWEET " + i + ": " + tweets.statuses[i].text);
//     //             }
//     //         });
//     //     }
//     // };

//     // // retweet tweets by search
//     // retweet(search) {

//     //     liri
//     //         .twitter
//     //         .client
//     //         .get('search/tweets', {
//     //             q: search
//     //         }, function (error, tweets, response) {

//     //             // console.log(tweets);

//     //             for (let i = 0; i < 1; i++) {

//     //                 console.log("TWEET " + i + ": " + tweets.statuses[i].text);
//     //                 console.log("TWEET ID " + i + ": " + tweets.statuses[i].id);

//     //                 var tweetId = tweets.statuses[i].id_str;

//     //                 liri
//     //                     .twitter
//     //                     .client
//     //                     .post("statuses/retweet/" + tweetId, function (error, tweet, response) {
//     //                         if (!error) {
//     //                             console.log("Tweeted: " + tweet.text);

//     //                         } else {
//     //                             console.log(error)
//     //                         }
//     //                     });
//     //             }
//     //         });
//     // };

//     // add(user) {

//     //     liri
//     //         .client
//     //         .post("friendships/create", {
//     //             screen_name: user
//     //         }, function (err, response) {
//     //             if (err) {
//     //                 console.log(err)
//     //             }

//     //             console.log(user + " is now followed!");
//     //         })

//     // };

//     // followListen() {
//     //     var stream = liri
//     //         .twitter
//     //         .client
//     //         .stream('user');
//     //     stream.on('follow', followed);

//     //     function followed(event) {
//     //         var name = event.source.screen_name;
//     //         if (name != liri.twitter.screenName) {
//     //             console.log(name + " followed!");
//     //             liri
//     //                 .twitter
//     //                 .post("@" + name + " Thanks for following!");
//     //             liri
//     //                 .twitter
//     //                 .add(name);
//     //         } else {
//     //             console.log("done");
//     //             return
//     //         }
//     //     }

//     // };

//     // fav(search) {
//     //     this.client.get("search/tweets", {
//     //         q: search,
//     //         count: 1
//     //     }, function (error, tweets, response) {
//     //         var tweetext = (tweets.statuses[0].text);
//     //         var id = (tweets.statuses[0].id_str);
//     //         if (search) {
//     //             liri
//     //                 .twitter
//     //                 .client
//     //                 .post("favorites/create", {
//     //                     id: id
//     //                 }, function (err) {
//     //                     if (err) {
//     //                         console.log(err);
//     //                         return;
//     //                     } else {
//     //                         console.log("tweet: " + tweetext + " favorited")
//     //                     }
//     //                 })

//     //         }
//     //     })
//     // }
// };


// console.log("liri initiated");