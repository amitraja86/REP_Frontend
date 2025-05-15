// src/api/axiosInstance.js
import axios from "axios";

// Show a simple popup for token expiration
function showTokenExpiredPopup() {
  const popup = document.createElement("div");
  popup.innerText = "Session expired. Redirecting to login...";
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.backgroundColor = "#f44336"; // red background
  popup.style.color = "#fff";
  popup.style.padding = "12px 24px";
  popup.style.borderRadius = "6px";
  popup.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
  popup.style.zIndex = 9999;
  popup.style.fontSize = "16px";
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  }, 3000); // 3 seconds
}

// const axiosInstance = axios.create({
//   // baseURL: "http://127.0.0.1:8000/api/v2",
//   // baseURL: "https://recruitment-intelligence.appzlogic.in/api/"
//   baseURL: process.env.REACT_APP_API_BASE_URL
// });
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Attach token to each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 (Unauthorized) globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      showTokenExpiredPopup(); // 👈 show popup
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
