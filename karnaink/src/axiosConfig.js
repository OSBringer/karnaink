// axiosConfig.js
import axios from "axios";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  // You can also add other Axios configuration options here
});

export default instance;
