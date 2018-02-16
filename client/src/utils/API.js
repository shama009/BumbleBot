import axios from "axios";

export default {
    getUser: (username) => {
        return axios.post("/api/users", username);
    },

    saveUser: (userData) => {
        return axios.post("/api/user", userData);
    },

    twitterHit: () => {
        console.log("api");
        return axios.get("/auth/twitter", function(req, res, next){
            console.log("client");
            //console.log(req);
        });
    }
}
