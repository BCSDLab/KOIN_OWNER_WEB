import {
  LoginParam, LoginResponse, UserResponse,
} from 'model/auth';
import authApi from './authApiClient';

export const postLogin = (param: LoginParam) => authApi.post<LoginResponse>('/user/login', param);

export const getMe = async (token: string) => authApi.get<UserResponse>('/owner', {
  headers: { Authorization: `Bearer ${token}` },
});
