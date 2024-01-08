import { client, multipartClient } from 'api';
import {
  AuthCodeParam,
  AuthCodeResponse,
  EmailRegisterParam,
  EmailRegisterResponse,
  FilesResponse,
  RegisterParam,
} from 'model/register';

export const getEmailDuplicate = async (param: string) => {
  const { status } = await client.get(`/user/check/email?address=${param}`);
  return status;
};

export const getEmailAuthCode = async (param: EmailRegisterParam) => {
  const { data } = await client.post<EmailRegisterResponse>('/owners/verification/email', param);
  return EmailRegisterResponse.parse(data);
};

export const verificationAuthCode = async (param:AuthCodeParam) => {
  const { data } = await client.post<AuthCodeResponse>('/owners/verification/code', param);
  return AuthCodeResponse.parse(data);
};

export const registerUser = async (param:RegisterParam) => {
  const { status } = await client.post('/owners/register', param);
  return status;
};

export const getFileUrls = async (param:FormData, token:string) => {
  multipartClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  const { data } = await multipartClient.post('/owners/upload/files', param);
  return FilesResponse.parse(data);
};
