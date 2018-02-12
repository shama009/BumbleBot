const Liri = require("../liri/liri");

module.exports = function (app, db) {

    app.get("/api/twitter/:screenName/:method/:input", (req, res) => {
        console.log(`endpont hit`);
        db.Liri.findOne({
                screenName: req.params.screenName
            })
            .then(data => {

                // let client = new Liri(data);
                let client = new Liri(data.consumer_key, data.consumer_secret, data.access_token_key, data.access_token_secret, data.screenName);
                client.init();
                console.log(client);

                switch (req.params.method) {

                    case "get":
                        client.get(req.params.input);
                        break;

                    case "post":
                        client.post(req.params.input);
                        break;

                    case "fav":
                        client.fav(req.params.input);
                        break;
                        
                    default:
                        console.log("default");
                        break;
                }

                res.json(client);
            })
            .catch(err => res.send("PROBLEM"));
    });

    app.get("/testing0", (req, res) => {
        db.Liri.find()
            .then(() => res.send("success"))
            .catch(err => res.send(err));
    });

    app.post("/api/twitter/clients/new", (req, res) => {
        // when a user submits a new bot
        console.log(db);

        db.Liri.create(req.body)
            .then(data => {
                console.log(data);
                res.json("done!")
            })
            .catch(err => console.log(err));
    });
}