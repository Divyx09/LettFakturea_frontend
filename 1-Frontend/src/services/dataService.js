import api from './api';

export const termsService = {
  /**
   * Fetch terms by language
   * @param {string} language - The language to fetch terms for
   * @returns {Promise} API response
   */
  getTermsByLanguage: async (language) => {
    try {
      const response = await api.get(`/terms?language=${language}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching terms:', error);
      throw error;
    }
  },
};

export const productsService = {
  /**
   * Fetch all products
   * @returns {Promise} API response
   */
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Create a new product
   * @param {Object} productData - Product data
   * @returns {Promise} API response
   */
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  /**
   * Update a product
   * @param {string} id - Product ID
   * @param {Object} productData - Updated product data
   * @returns {Promise} API response
   */
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  /**
   * Delete a product
   * @param {string} id - Product ID
   * @returns {Promise} API response
   */
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};
