const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const homepageSettingsService = {
  // Public endpoint - get featured products for homepage
  getFeaturedProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage-settings/featured-products`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch featured products');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Admin endpoint - get homepage settings with metadata
  getHomepageSettings: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage-settings/admin`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch homepage settings');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching homepage settings:', error);
      throw error;
    }
  },

  // Admin endpoint - update featured products
  updateFeaturedProducts: async (featuredProducts, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage-settings/featured-products`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ featuredProducts })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update featured products');
      }
      
      return data;
    } catch (error) {
      console.error('Error updating featured products:', error);
      throw error;
    }
  },

  // Admin endpoint - clear all featured products
  clearFeaturedProducts: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage-settings/featured-products`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to clear featured products');
      }
      
      return data;
    } catch (error) {
      console.error('Error clearing featured products:', error);
      throw error;
    }
  },

  // Admin endpoint - add single product to featured
  addFeaturedProduct: async (productId, order, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage-settings/featured-products/${productId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add featured product');
      }
      
      return data;
    } catch (error) {
      console.error('Error adding featured product:', error);
      throw error;
    }
  },

  // Admin endpoint - remove single product from featured
  removeFeaturedProduct: async (productId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/homepage-settings/featured-products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove featured product');
      }
      
      return data;
    } catch (error) {
      console.error('Error removing featured product:', error);
      throw error;
    }
  }
};