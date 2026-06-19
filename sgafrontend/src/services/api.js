import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// attach JWT token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// redirect to login if token expired
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// Resume
export const uploadResume = (formData) => api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

// Analysis
export const startAnalysis = (data) => api.post('/analysis/start', data);
export const getHistory = () => api.get('/analysis/history');
export const getAnalysis = (id) => api.get(`/analysis/${id}`);
export const deleteAnalysis = (id) => api.delete(`/analysis/${id}`);

export default api;