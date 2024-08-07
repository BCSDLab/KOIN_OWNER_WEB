import { client, multipartClient } from 'api';
import {
  AuthCodeParam,
  PhoneNumberRegisterParam,
  AuthCodeResponse,
  FilesResponse,
  RegisterParam,
  PhoneNumberRegisterResponse,
} from 'model/register';
import { RegisterUser } from 'model/auth';

export const getEmailDuplicate = async (param: string) => {
  const { status } = await client.get(`/user/check/email?address=${param}`);
  return status;
};

// export const getEmailAuthCode = async (param: EmailRegisterParam) => {
//   const { data } = await client.post<EmailRegisterResponse>('/owners/verification/email', param);
//   return EmailRegisterResponse.parse(data);
// };

export const getPhoneAuthCode = async (param: PhoneNumberRegisterParam) => {
  const { data } = await client.post<PhoneNumberRegisterResponse>('/owners/verification/sms', param);
  return PhoneNumberRegisterResponse.parse(data);
};
export const verificationAuthCode = async (param:AuthCodeParam) => {
  const { data } = await client.post<AuthCodeResponse>('/owners/verification/code/sms', param);
  return AuthCodeResponse.parse(data);
};

export const registerUser = async (param:RegisterParam) => {
  const { status } = await client.post('/owners/register', param);
  return status;
};

export const phoneRegisterUser = async (param:RegisterUser) => {
  const { status } = await client.post('/owners/register/phone', param);
  return status;
};
export const getFileUrls = async (param:FormData, token:string) => {
  multipartClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  const { data } = await multipartClient.post('/owners/upload/files', param);
  return FilesResponse.parse(data);
};
