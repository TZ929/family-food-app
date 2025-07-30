import axios from 'axios';
import { getToken } from '../utils/auth';

import { API_URL } from '@env';

const api = axios.create({
  baseURL: API_URL,
});

// attach token automatically
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  console.log('🔑 Token from storage:', token ? 'exists' : 'missing');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
    console.log('✅ Added Authorization header to:', config.url);
  } else {
    console.log('❌ No token found for request to:', config.url);
  }
  return config;
});

export default api;
