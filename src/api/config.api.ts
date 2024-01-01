import axios from "axios";

const https = axios.create({
  baseURL: "https://server-vue.vercel.app/api",
});

export default https