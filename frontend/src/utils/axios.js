import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001",  // Update this to match your new backend port
    withCredentials: true, // Ensures cookies are sent with requests
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
