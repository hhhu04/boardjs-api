const axios = require('axios');

const createApiClient = (baseURL, options = {}) => {
  const client = axios.create({
    baseURL,
    timeout: options.timeout || 10000,
    headers: {
      'User-Agent': 'board-server/1.0.0',
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  client.interceptors.request.use(
    (config) => {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error(`API Error (${error.config?.baseURL}):`, error.message);
      console.error('Request config:', {
        method: error.config?.method,
        url: error.config?.url,
        params: error.config?.params,
        data: error.config?.data
      });
      return Promise.reject(error);
    }
  );

  return client;
};


module.exports = {
  createApiClient,
};