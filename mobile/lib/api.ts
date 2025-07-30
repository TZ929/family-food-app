import axios from 'axios';
import { getToken } from '../utils/auth';

// TODO: move to env or config
const API_URL = 'http://172.20.10.8:5000';

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
