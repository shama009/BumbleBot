import axios from "axios";

const BASEURL = "https://localhost:3300/";

export default {
    search: function(query) {
      return axios.get(BASEURL + query);
    }
  };