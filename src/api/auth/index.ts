import { accessClient, client } from 'api';
import {
  LoginParams, LoginResponse, UserResponse, UserTypeResponse,
} from 'model/auth';

export const postLogin = async (param: LoginParams) => {
  const { data } = await client.post<LoginResponse>('/user/login', param);
  return LoginResponse.parse(data);
};

export const postLogout = () => accessClient.post('/user/logout');

export const getUserType = async () => {
  const { data } = await accessClient.get<UserTypeResponse>('/user/auth');
  return UserTypeResponse.parse(data);
};

export const getOwnerInfo = async () => {
  const { data } = await accessClient.get<UserResponse>('/owner');
  return UserResponse.parse(data);
};

export const findPasswordVerify = ({ email }: { email: string }) => client.post('/owners/password/reset/verification', { address: email });

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

export const newPassword = ({ address, password }: { address: string, password: string }) => client.put('/owners/password/reset', { address, password });
