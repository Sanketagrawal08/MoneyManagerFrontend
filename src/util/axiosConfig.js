import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const excludeEndpoints = ["/login", "/register", "/activate"];

// ✅ Request interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!shouldSkipToken) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    } else if (error.response?.status === 500) {
      console.error("Server error. Please try again later");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again");
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;
