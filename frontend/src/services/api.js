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

export const packageService = {
  getAll: (params) => API.get('/packages', { params }),
  getDestinations: () => API.get('/packages/destinations'),
  getCategories: () => API.get('/packages/categories'),
  getById: (id) => API.get(`/packages/${id}`),
};

export const activityService = {
  getAll: (params) => API.get('/activities', { params }),
  getCategories: () => API.get('/activities/categories'),
  getDestinations: () => API.get('/activities/destinations'),
  getById: (id) => API.get(`/activities/${id}`),
};

export const cabService = {
  getAll: (params) => API.get('/cabs', { params }),
  getTypes: () => API.get('/cabs/types'),
  getDestinations: () => API.get('/cabs/destinations'),
  getById: (id) => API.get(`/cabs/${id}`),
};

export const rentalService = {
  getAll: (params) => API.get('/rentals', { params }),
  getTypes: () => API.get('/rentals/types'),
  getDestinations: () => API.get('/rentals/destinations'),
  getById: (id) => API.get(`/rentals/${id}`),
};

export const enquiryService = {
  submit: (data) => API.post('/enquiries', data),
};

export const teamService = {
  getAll: (params) => API.get('/teams', { params }),
};

export const contactService = {
  submit: (data) => API.post('/contacts', data),
};

export const blogService = {
  getAll: (params) => API.get('/blogs', { params }),
  getById: (id) => API.get(`/blogs/${id}`),
};

export default API;
