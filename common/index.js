// api.js
import axios from "axios";

const APIInstance = axios.create({
  baseURL: 'http://localhost:8080', // Update this with your API endpoint
});

APIInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authtoken');
  config.headers.authorization = authToken ? authToken : '';
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default APIInstance;

// apiCalls.js
import APIInstance from './api';

// Common function for making API calls
const makeApiCall = async (method, url, data = null) => {
  try {
    const response = await APIInstance({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API calls for authentication
export const login = async (credentials) => {
  return makeApiCall('post', '/login', credentials);
};

export const signup = async (userData) => {
  return makeApiCall('post', '/signup', userData);
};

// API calls for products
export const getProducts = async () => {
  return makeApiCall('get', '/products');
};

export const deleteProduct = async (productId) => {
  return makeApiCall('delete', `/products/${productId}`);
};

export const updateProduct = async (productId, updatedData) => {
  return makeApiCall('put', `/products/${productId}`, updatedData);
};

export const patchProduct = async (productId, patchedData) => {
  return makeApiCall('patch', `/products/${productId}`, patchedData);
};
