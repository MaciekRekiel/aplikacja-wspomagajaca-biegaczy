import axios from "axios";

const instance = axios.create({
  baseURL: "http://dc59-83-28-14-18.ngrok.io",
});

export default instance;
