import axios from "axios";
// import { getJwtToken } from "@/helpers/jwt/index.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    // Authorization: "Bearer " + getJwtToken(),
  },
});
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
