import {
  LoginParam, LoginResponse, UserResponse,
} from 'model/auth';
import authApi from './authApiClient';

export const postlogin = async (param: LoginParam) => {
  const { data } = await authApi.post<LoginResponse>('/user/login', param);
  return LoginResponse.parse(data);
};

export const getMe = async (token: string) => {
  const { data } = await authApi.get<UserResponse>('/owner', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return UserResponse.parse(data);
};
