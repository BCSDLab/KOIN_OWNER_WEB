/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import API_PATH from 'config/constants';
import { RefreshParams, RefreshResponse } from 'model/auth';
import { CustomAxiosError, KoinError } from 'model/error';

const client = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 20000,
});

const accessClient = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 20000,
});

const multipartClient = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 20000,
});

const refresh = async (config: InternalAxiosRequestConfig) => {
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

function isAxiosErrorWithResponseData(error: AxiosError<KoinError>) {
  const { response } = error;
  return response?.status !== undefined
    && response.data.code !== undefined
    && response.data.message !== undefined;
}

function createKoinErrorFromAxiosError(error: AxiosError<KoinError>): KoinError | CustomAxiosError {
  if (isAxiosErrorWithResponseData(error)) {
    const koinError = error.response!;
    return {
      type: 'koin-error',
      status: koinError.status,
      code: koinError.data.code,
      message: koinError.data.message,
    };
  }
  return {
    type: 'axios-error',
    ...error,
  };
}

client.interceptors.response.use(
  (response) => response,
  async (error) => createKoinErrorFromAxiosError(error),
);

accessClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료시 새로운 accessToken으로 재요청
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refresh(originalRequest);
    }

    return createKoinErrorFromAxiosError(error);
  },
);

multipartClient.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  },
);

multipartClient.interceptors.response.use(
  (response) => response,
  async (error) => createKoinErrorFromAxiosError(error),
);

export { client, accessClient, multipartClient };
