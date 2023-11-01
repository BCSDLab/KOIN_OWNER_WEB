import { client } from 'api';
import {
  AuthCodeParam, AuthCodeResponse, EmailRegisterParam, EmailRegisterResponse,
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
