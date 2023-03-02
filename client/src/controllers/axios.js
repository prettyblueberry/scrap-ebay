import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001/api/',
});
api.interceptors.response.use((response) => response, (error) => {
    // whatever you want to do with the error
    throw error;
});

export default api;