import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
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
