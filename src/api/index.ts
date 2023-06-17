/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import API_PATH from 'config/constants';
import { RefreshParams, RefreshResponse } from './auth/model';

const client = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

const accessClient = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

const refresh = (config: InternalAxiosRequestConfig) => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (refreshToken) {
    return client.post<RefreshResponse, AxiosResponse<RefreshResponse>, RefreshParams>(
      '/user/refresh',
      { refresh_token: refreshToken },
    ).then(({ data }) => {
      config.headers.authorization = `Bearer ${data.token}`;
      sessionStorage.setItem('access_token', data.token);
      localStorage.setItem('refresh_token', data.refresh_token);
      return config;
    }).catch(() => {
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return Promise.reject(new Error('토큰없음'));
    });
  }
  return Promise.reject(new Error('토큰없음'));
};

accessClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
    return refresh(config);
  },
);

accessClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.message) return Promise.reject(error.message);

    const originalRequest = error.config;

    // accessToken만료시 새로운 accessToken으로 재요청
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return refresh(originalRequest);
    }
    return Promise.reject(error);
  },
);

const categoryApi = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

categoryApi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (config.headers && token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
);

export { client, accessClient, categoryApi };
