import axios from "axios";

export const supplairAPI = axios.create({
  baseURL: "http://localhost:7777",
});

export const fileUpload = axios.create({
  baseURL : "http://localhost:8084"
})
