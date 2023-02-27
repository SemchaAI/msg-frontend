import axios from "axios";
import { API_URL } from "../../config";

const apiInstance = axios.create({
  baseURL: API_URL,
});

apiInstance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default apiInstance;
