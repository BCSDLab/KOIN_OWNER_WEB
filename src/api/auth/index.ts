import { accessClient, client } from 'api';
import {
  LoginParam, LoginResponse, UserResponse,
} from 'model/auth';

export const postLogin = async (param: LoginParam) => {
  const { data } = await client.post<LoginResponse>('/user/login', param);
  return LoginResponse.parse(data);
};

export const getMe = async () => {
  const { data } = await accessClient.get<UserResponse>('/owner');
  return UserResponse.parse(data);
};
