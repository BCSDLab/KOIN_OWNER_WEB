/* eslint-disable no-param-reassign */
import axios from 'axios';
import API_PATH from 'config/constants';

const client = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

const accessClient = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

accessClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

const searchApi = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

searchApi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (config.headers && token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
);

export { client, accessClient, searchApi };
