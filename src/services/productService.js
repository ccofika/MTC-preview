import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance for product service
const productAPI = axios.create({
  baseURL: `${API_BASE_URL}/products`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
productAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Product API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Product service methods
export const productService = {
  // Get all products with filters
  getProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          if (Array.isArray(filters[key])) {
            filters[key].forEach(value => params.append(key, value));
          } else {
            params.append(key, filters[key]);
          }
        }
      });

      const response = await productAPI.get(`/?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    try {
      const response = await productAPI.get(`/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
  },

  // Get product categories
  getCategories: async () => {
    try {
      const response = await productAPI.get('/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit = 6) => {
    try {
      const response = await productAPI.get(`/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured products');
    }
  },

  // Search products
  searchProducts: async (searchTerm, filters = {}) => {
    try {
      const params = new URLSearchParams({ search: searchTerm });
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await productAPI.get(`/search?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search products');
    }
  },

  // Get products by category
  getProductsByCategory: async (category, filters = {}) => {
    try {
      const params = new URLSearchParams({ category });
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await productAPI.get(`/category?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products by category');
    }
  },

  // Get product colors
  getAvailableColors: async () => {
    try {
      const response = await productAPI.get('/colors');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch available colors');
    }
  },

  // Get product sizes
  getAvailableSizes: async () => {
    try {
      const response = await productAPI.get('/sizes');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch available sizes');
    }
  },

  // Admin methods (require authentication)
  createProduct: async (productData, token) => {
    try {
      const response = await productAPI.post('/', productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
  },

  updateProduct: async (productId, productData, token) => {
    try {
      const response = await productAPI.put(`/${productId}`, productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
  },

  deleteProduct: async (productId, token) => {
    try {
      const response = await productAPI.delete(`/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  },

  // Get all products for admin (including hidden)
  getAllProductsForAdmin: async (filters = {}, token) => {
    try {
      const params = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await productAPI.get(`/admin/all?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products for admin');
    }
  },

  // Hide product (admin)
  hideProduct: async (productId, token) => {
    try {
      const response = await productAPI.patch(`/${productId}/hide`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to hide product');
    }
  },

  // Show product (admin)
  showProduct: async (productId, token) => {
    try {
      const response = await productAPI.patch(`/${productId}/show`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to show product');
    }
  },

  // Upload catalog PDF (admin)
  uploadCatalogPdf: async (productId, file, token) => {
    try {
      const formData = new FormData();
      formData.append('catalogPdf', file);

      const response = await productAPI.post(`/${productId}/catalog`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload catalog PDF');
    }
  },

  // Delete catalog PDF (admin)
  deleteCatalogPdf: async (productId, token) => {
    try {
      const response = await productAPI.delete(`/${productId}/catalog`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete catalog PDF');
    }
  },

  // Associate image with color (admin)
  associateImageWithColor: async (productId, imageIndex, colorName, token) => {
    try {
      const response = await productAPI.patch(`/${productId}/images/associate-color`, 
        {
          imageIndex,
          colorName
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to associate image with color');
    }
  },

  // Get images by color for a product
  getImagesByColor: async (productId, color) => {
    try {
      const params = color ? `?color=${encodeURIComponent(color)}` : '';
      const response = await productAPI.get(`/${productId}/images/by-color${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get images by color');
    }
  },

  // Reorder gallery images (admin)
  reorderGalleryImages: async (productId, imageOrder, token) => {
    try {
      const response = await productAPI.patch(`/${productId}/images/reorder`, 
        { imageOrder },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reorder gallery images');
    }
  }
};

export default productService;