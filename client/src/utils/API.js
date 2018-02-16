import axios from "axios";

export default {
    getUser: (username) => {
        return axios.post("/api/users", username);
    },

    saveUser: (userData) => {
        return axios.post("/api/user", userData);
    },

    get: () => {
      return axios.get()
    }
}
