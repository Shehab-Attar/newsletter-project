import axios from "axios";
 
export const axiosInstance = axios.create({
  baseURL: "https://data.argaam.com",
 
  headers: {
    Authorization: `Bearer GZb8!vH2!mX7^sP5#tL4@pW8!nJ3^zR6`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Encoding": "gzip",
  },
});