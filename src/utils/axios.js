import axios from "axios";

export const supplairAPI = axios.create({
  baseURL: "http://192.168.137.1:7777",
});

export const fileUpload = axios.create({
  baseURL : "http://192.168.137.1:8084"
})