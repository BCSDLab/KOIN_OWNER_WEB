import { accessClient, client } from 'api';
import {
  PostLoginParams, LoginResponse, UserResponse,
} from 'api/auth/model';

export const postLogin = async (param: PostLoginParams) => {
  const { data } = await client.post<LoginResponse>('/user/login', param);
  return LoginResponse.parse(data);
};

export const postLogout = () => accessClient.post('/user/logout');

export const getMe = async () => {
  const { data } = await accessClient.get<UserResponse>('/owner');
  return UserResponse.parse(data);
};
