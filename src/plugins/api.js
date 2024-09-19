import axios from "axios";

// const BASE_URL = "https://examserver-production-6a2c.up.railway.app/api";
const BASE_URL = "http://localhost:3200/api";

const token = localStorage.getItem("rtpu")
  ? JSON.parse(localStorage.getItem("rtpu")).token
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
