import axios from "axios";

export default {
    getUser: (username) => {
        return axios.post("/api/users", username);
    },

    saveUser: (userData) => {
        return axios.post("/api/user", userData);
    },

    get: (data) => {
        return axios.post("/api/twitter", data);
    },

    test: () => {
        return axios.get("/auth/twitter");
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
