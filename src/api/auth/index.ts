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

export const findPasswordVerify = ({ address }: { address: string }) => client.post('/owners/password/reset/verification', { address });

export const findPassword = ({
  address,
  certificationCode,
}: {
  address: string;
  certificationCode: string;
}) => client.post('/owners/password/reset/send', {
  address,
  certification_code: certificationCode,
});
