import axios from 'axios';
import { getToken } from '../utils/auth';

import { API_URL } from '@env';

const api = axios.create({
  baseURL: API_URL,
});

// attach token automatically
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
