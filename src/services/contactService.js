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
  },

  // Get contact messages (for admin)
  getMessages: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await contactAPI.get(`/messages?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch messages');
    }
  },

  // Get message by ID (for admin)
  getMessageById: async (messageId) => {
    try {
      const response = await contactAPI.get(`/messages/${messageId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch message');
    }
  },

  // Update message status (for admin)
  updateMessageStatus: async (messageId, status) => {
    try {
      const response = await contactAPI.patch(`/messages/${messageId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update message status');
    }
  },

  // Reply to message (for admin)
  replyToMessage: async (messageId, replyData) => {
    try {
      const response = await contactAPI.post(`/messages/${messageId}/reply`, replyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reply');
    }
  },

  // Delete message (for admin)
  deleteMessage: async (messageId) => {
    try {
      const response = await contactAPI.delete(`/messages/${messageId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete message');
    }
  },

  // Get message statistics (for admin dashboard)
  getMessageStats: async () => {
    try {
      const response = await contactAPI.get('/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch message statistics');
    }
  }
};

export default contactService;