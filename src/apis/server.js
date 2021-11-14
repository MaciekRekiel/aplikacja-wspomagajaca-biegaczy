import axios from "axios";

const instance = axios.create({
  baseURL: "https://runner-app-server.azurewebsites.net",
});

export default instance;
