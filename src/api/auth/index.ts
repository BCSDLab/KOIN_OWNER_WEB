import { accessClient, client } from 'api';
import { LoginParams, LoginResponse, UserResponse } from 'model/auth';
// import {
//   LoginParams, LoginResponse, UserResponse,
// } from 'api/auth/model';

export const postLogin = async (param: LoginParams) => {
  const { data } = await client.post<LoginResponse>('/user/login', param);
  return LoginResponse.parse(data);
};

export const postLogout = () => accessClient.post('/user/logout');

export const getMe = async () => {
  const { data } = await accessClient.get<UserResponse>('/owner');
  return UserResponse.parse(data);
};
