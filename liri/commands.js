const Command = require("../models/Command");

module.exports = class Bumbler {

    constructor(id, user_id, method, input, interval) {
        this.id = id;
        this.user_id = user_id;
        this.data = {
            method: method,
            input: input,
            interval: interval
        };
        this.client = "";
        this.worker = "";
    }

    initialize(client) {
        this.client = client;
    }

    handler(request) {
        console.log(request);
        switch (request.active) {
            case true:
                switch (this.data.method) {
                    case "get":
                        this.worker = setInterval(() => this.client.get(this.data.input, tweet => console.log(tweet[0].text)), this.data.interval);
                        break;
                    case "fav":
                        this.worker = setInterval(() => this.client.fav(this.data.input, tweet => console.log(tweet[0].text)), this.data.interval);
                        break;
                    case "retweet":
                        this.worker = setInterval(() => this.client.retweet(this.data.input, tweet => console.log(tweet[0].text)), this.data.interval);
                        break;
                    case "follow-listen":
                        this.worker = this.client.followListen(msg => console.log(msg));
                        break;
                }
                break;
            case false:
                clearInterval(this.worker);
                this.worker = "";
        }
    }

    store() {
        console.log("test");
        const command = new Command();

        command.id = this.id;
        command.user_id = this.id;
        command.data.method = this.data.method;
        command.data.input = this.data.input;
        command.data.interval = this.data.interval;

        command.save(err => err ? console.log(err) : console.log(command));
    }
}

// const command = new Command();

// command.id = Date.now();
// command.user_id = data.twitter.id;
// command.data.method = req.body.method;
// command.data.input = req.body.input;
// command.data.interval = req.body.interval;

// command.save(err => err ? console.log(err) : console.log(command));