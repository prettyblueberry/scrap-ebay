import axios from "axios";

const api = axios.create({
    baseURL: (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "") +'/api/',
});
api.interceptors.response.use((response) => response, (error) => {
    // whatever you want to do with the error
    throw error;
});

export default api;