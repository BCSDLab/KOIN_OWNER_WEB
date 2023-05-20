import { accessClient, client } from 'api';
import { LoginResponse, LoginSchemaType, UserResponse } from 'api/auth/model';

export const postLogin = async (param: LoginSchemaType) => {
  const { data } = await client.post<LoginResponse>('/user/login', param);
  return LoginResponse.parse(data);
};

export const getMe = async () => {
  const { data } = await accessClient.get<UserResponse>('/owner');
  return UserResponse.parse(data);
};
