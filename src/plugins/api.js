import axios from "axios";

const BASE_URL = "https://examserver-production-6a2c.up.railway.app/api";
// const BASE_URL = "http://localhost:3200/api";

const token = localStorage.getItem("medi24user")
  ? JSON.parse(localStorage.getItem("medi24user")).token
  : null;
const headers = {
  "Content-Type": "application/json",
};

if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers,
});





export { api };
