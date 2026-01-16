import axios from "axios";

const api =axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "api/"
})

// Intercepteur pour ajouter le Token à chaque requête
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;