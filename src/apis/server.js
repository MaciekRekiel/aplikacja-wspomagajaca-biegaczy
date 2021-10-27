import axios from "axios";

const instance = axios.create({
  baseURL: "http://2064-83-28-15-252.ngrok.io",
});

export default instance;
