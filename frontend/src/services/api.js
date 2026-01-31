import axios from "axios";

const API = axios.create({
  baseURL: "https://preptracker-student-placement-platform-1.onrender.com",
});

export default API;
