import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance for contact service
const contactAPI = axios.create({
  baseURL: `${API_BASE_URL}/contact`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for handling form data
contactAPI.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
contactAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Contact API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Contact service methods
export const contactService = {
  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await contactAPI.post('/submit', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit contact form');
    }
  }
};

export default contactService;