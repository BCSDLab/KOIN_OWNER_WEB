/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios, { AxiosResponse } from 'axios';
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
  (config) => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
);

accessClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken만료시 새로운 accessToken으로 재요청
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        return client.post<RefreshResponse, AxiosResponse<RefreshResponse>, RefreshParams>('/user/refresh', { refresh_token: refreshToken })
          .then(({ data }) => {
            originalRequest.headers.authorization = `Bearer ${data.token}`;
            sessionStorage.setItem('access_token', data.token);
            localStorage.setItem('refresh_token', data.refresh_token);
            return accessClient(originalRequest);
          }).catch(() => {
            sessionStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            return Promise.reject(error);
          });
      }
    }
    return Promise.reject(error);
  },
);

export { client, accessClient };
