var Twitter = require('twitter');

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
    post(status) {
        this.client.post("statuses/update", {
            status: status
        }, function (error, tweet, response) {

            if (!error) {
                console.log("Tweeted: " + tweet.text);

            } else {
                console.log(error)
            }
        })
    }


    // search twitter
    get(search) {

        if (search) {

            this.client.get('search/tweets', {
                q: search,
                count: 1
            }, function (error, tweets, response) {

                console.log("TWEET HISTORY (NEWEST TO OLDEST)");

                for (let i = 0; i < tweets.statuses.length; i++) {

                    console.log("TWEET " + i + ": " + tweets.statuses[i].text);
                }
            });

        } else {

            liri.twitter.client.get('search/tweets', {
                q: this.screenName
            }, function (error, tweets, response) {
                if (error) {
                    console.log(error);
                    return
                }

                console.log("MY TWEET HISTORY (NEWEST TO OLDEST)");

                for (let i = 0; i < tweets.statuses.length; i++) {

                    console.log("TWEET " + i + ": " + tweets.statuses[i].text);
                }
            });
        }
    }

    // retweet tweets by search
    retweet(search) {

        this.client.get('search/tweets', {
            q: search
        }, function (error, tweets, response) {

            // console.log(tweets);

            for (let i = 0; i < 1; i++) {

                console.log("TWEET " + i + ": " + tweets.statuses[i].text);
                console.log("TWEET ID " + i + ": " + tweets.statuses[i].id);



                var tweetId = tweets.statuses[i].id_str;

                liri.twitter.client.post("statuses/retweet/" + tweetId, function (error, tweet, response) {
                    if (!error) {
                        console.log("Tweeted: " + tweet.text);

                    } else {
                        console.log(error)
                    }
                });
            }
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

    followListen() {
        var stream = this.client.stream('user');
        stream.on('follow', followed);

        function followed(event) {
            var name = event.source.screen_name;
            if (name != liri.twitter.screenName) {
                console.log(name + " followed!");
                liri.twitter.post("@" + name + " Thanks for following!");
                liri.twitter.add(name);
            } else {
                console.log("done");
                return
            }
        }

    }

    fav(search) {

        this.client.get("search/tweets", {
            q: search,
            count: 1
        }, (error, tweets, response) => {
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
                        console.log("tweet: " + tweetext + " favorited")
                    }
                })

            }
        })
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