import axios from "axios";

const token = localStorage.getItem("private_token");

export const supplairAPI = axios.create({
  baseURL: "http://localhost:7777",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

suppl.get