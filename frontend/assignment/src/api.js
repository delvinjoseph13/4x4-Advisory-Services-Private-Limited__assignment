import axios from "axios";

const API = axios.create({
  baseURL: 'https://fourx4-advisory-services-private-limited.onrender.com/api/',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers = req.headers || {};
    req.headers.Authorization = `Bearer ${token}`;
    console.log("Attached token to request:", token);  
  } else {
    console.warn("No token in localStorage");  
  }
  return req;
});


export default API;
