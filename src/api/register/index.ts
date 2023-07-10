import { client } from 'api';
import {
  AuthCodeParam, AuthCodeResponse, EmailAuthParam, EmailAuthResponse,
} from './model';

export const getEmailDuplicate = async (param: string) => {
  const { status } = await client.get(`/user/check/email?address=${param}`);
  return status;
};

export const getEmailAuthCode = async (param: EmailAuthParam) => {
  const { data } = await client.post<EmailAuthResponse>('/owners/verification/email', param);
  return EmailAuthResponse.parse(data);
};

export const verificationAuthCode = async (param:AuthCodeParam) => {
  const { data } = await client.post<AuthCodeResponse>('/owners/verification/code', param);
  return AuthCodeResponse.parse(data);
};
