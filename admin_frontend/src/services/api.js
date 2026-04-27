import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the token in headers if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginAdmin = (credentials) => API.post('/admin/login', credentials);

// Upload
export const uploadImage = (formData) => API.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Dashboard Stats
export const getStats = () => API.get('/admin/stats');

// Packages
export const packageService = {
  getAll: (params) => API.get('/packages', { params }),
  getDestinations: () => API.get('/packages/destinations'),
  getById: (id) => API.get(`/packages/${id}`),
  create: (data) => API.post('/packages', data),
  update: (id, data) => API.put(`/packages/${id}`, data),
  delete: (id) => API.delete(`/packages/${id}`),
};

// Activities
export const activityService = {
  getAll: (params) => API.get('/activities', { params }),
  getCategories: () => API.get('/activities/categories'),
  getDestinations: () => API.get('/activities/destinations'),
  getById: (id) => API.get(`/activities/${id}`),
  create: (data) => API.post('/activities', data),
  update: (id, data) => API.put(`/activities/${id}`, data),
  delete: (id) => API.delete(`/activities/${id}`),
};

// Cabs
export const cabService = {
  getAll: (params) => API.get('/cabs', { params }),
  getTypes: () => API.get('/cabs/types'),
  getDestinations: () => API.get('/cabs/destinations'),
  getById: (id) => API.get(`/cabs/${id}`),
  create: (data) => API.post('/cabs', data),
  update: (id, data) => API.put(`/cabs/${id}`, data),
  delete: (id) => API.delete(`/cabs/${id}`),
};

// Rentals
export const rentalService = {
  getAll: (params) => API.get('/rentals', { params }),
  getTypes: () => API.get('/rentals/types'),
  getDestinations: () => API.get('/rentals/destinations'),
  getById: (id) => API.get(`/rentals/${id}`),
  create: (data) => API.post('/rentals', data),
  update: (id, data) => API.put(`/rentals/${id}`, data),
  delete: (id) => API.delete(`/rentals/${id}`),
};

// Hotels
export const hotelService = {
  getAll: (params) => API.get('/hotels', { params }),
  getById: (id) => API.get(`/hotels/${id}`),
  create: (data) => API.post('/hotels', data),
  update: (id, data) => API.put(`/hotels/${id}`, data),
  delete: (id) => API.delete(`/hotels/${id}`),
};

// Blogs
export const blogService = {
  getAll: (params) => API.get('/blogs', { params }),
  getById: (id) => API.get(`/blogs/${id}`),
  create: (data) => API.post('/blogs', data),
  update: (id, data) => API.put(`/blogs/${id}`, data),
  delete: (id) => API.delete(`/blogs/${id}`),
};

// Team
export const teamService = {
  getAll: (params) => API.get('/teams', { params }),
  getById: (id) => API.get(`/teams/${id}`),
  create: (data) => API.post('/teams', data),
  update: (id, data) => API.put(`/teams/${id}`, data),
  delete: (id) => API.delete(`/teams/${id}`),
};

// Enquiries & Contacts
export const enquiryService = {
  getAll: (params) => API.get('/enquiries', { params }),
  delete: (id) => API.delete(`/enquiries/${id}`),
};

export const contactService = {
  getAll: (params) => API.get('/contacts', { params }),
  delete: (id) => API.delete(`/contacts/${id}`),
};

export default API;
