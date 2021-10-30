import axios from "axios";

const instance = axios.create({
  baseURL: "http://d70c-83-28-9-63.ngrok.io",
});

export default instance;
