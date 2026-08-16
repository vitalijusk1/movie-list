import axios from "axios";
import { store } from "../store";
import { clearUser } from "../store/slices/UserSlice/userSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch(clearUser());
      }
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
