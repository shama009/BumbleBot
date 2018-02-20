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

    postTweet: () => {
        return axios.get()
    },

    followTweet: () => {
        return axios.get()
    },

    faveTweet: () => {
        return axios.get()
    },

    reTweet: () => {
        return axios.get()
    }
}
