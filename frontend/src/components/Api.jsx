import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/';
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const REFRESH_TOKEN = import.meta.env.VITE_REFRESH_TOKEN;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Authorization header in request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response)=>response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/token/refresh/",
                    {
                        refresh: localStorage.getItem(REFRESH_TOKEN),
                    }
                );
                const newAccessToken = response.data.access;
                const newRefreshToken = response.data.refresh;
                localStorage.setItem(ACCESS_TOKEN, newAccessToken);
                localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
                api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("refresh token expired:", refreshError);
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }

);

export default api;
export { BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN };
