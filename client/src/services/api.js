import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getMe: () => api.get('/auth/me'),
};

// Cars API
export const carsAPI = {
    getAll: (params) => api.get('/cars', { params }),
    getById: (id) => api.get(`/cars/${id}`),
    create: (carData) => api.post('/cars', carData),
    update: (id, carData) => api.put(`/cars/${id}`, carData),
    delete: (id) => api.delete(`/cars/${id}`),
    getCategories: () => api.get('/cars/categories/all'),
};

// Bookings API
export const bookingsAPI = {
    create: (bookingData) => api.post('/bookings', bookingData),
    getUserBookings: () => api.get('/bookings'),
    getById: (id) => api.get(`/bookings/${id}`),
    update: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
    cancel: (id) => api.delete(`/bookings/${id}`),
};

// Admin API
export const adminAPI = {
    getStats: () => api.get('/admin/stats'),
    getAllUsers: () => api.get('/admin/users'),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
    getAllBookings: () => api.get('/admin/bookings'),
};

export default api;
