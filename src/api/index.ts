/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
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

accessClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

accessClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken만료시 새로운 accessToken으로 재요청 => 다시 getme
    if (error.resopnse.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        client.post<RefreshParams, RefreshResponse>('/user/refresh', refreshToken)
          .then(({ token }) => {
            originalRequest.headers.authorization = `Bearer ${token}`;
            localStorage.setItem('access_token', token);

            return accessClient(originalRequest);
          }).catch(() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            return Promise.reject(error);
          });
      }
    }
    return Promise.reject(error);
  },
);

export { client, accessClient };
