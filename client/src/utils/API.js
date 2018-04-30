import axios from "axios";

export default {
    getUser: (username) => {
        return axios.post("/api/users", username);
    },

    saveUser: (userData) => {
        return axios.post("/api/user", userData);
    },

    getTweets: (id) => {
        return axios.post("/api/getTweets", id);

    },

    getCommands: id => axios.post("/api/commands", id),

    test: () => {
        axios.get("/auth/twitter");
    },

    postTweet: (tweetData) => {
        console.log("Post Utils route hit");
        console.log(tweetData);
        return axios.post("/api/twitter", tweetData);
    },

    followTweet: (data) => {
        console.log("Follow Utils route hit");
        return axios.post("/api/twitter", data);
    },

    favTweet: (tweetData) => {
        console.log("Utils route hit");
        return axios.post("/api/twitter", tweetData);
    },

    reTweet: (tweetData) => {
        return axios.post("/api/twitter", tweetData);
    }
}
