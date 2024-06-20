import { accessClient, client } from 'api';
import {
  CertificationResponse,
  LoginParams, LoginResponse, OwnerResponse, UserTypeResponse,
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
  const { data } = await accessClient.get<OwnerResponse>('/owner');
  return OwnerResponse.parse(data);
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

export const sendVerifyCode = (phone_number: string) => client.post('/owners/password/reset/verification/sms', {
  phone_number,
});

export const verifyCode = ({ phone_number, certification_code } : { phone_number:string, certification_code:string }) => client.post<CertificationResponse>('/owners/password/reset/send/sms', {
  phone_number, certification_code,
});

export const changePassword = ({ phone_number, password } : { phone_number:string, password:string }) => client.put('/owners/password/reset/sms', {
  phone_number,
  password,
});

export const loginByPhone = async (param: LoginParams) => {
  const { data } = await client.post('/owners/login', {
    param,
  });

  return LoginResponse.parse(data);
};
