/* eslint-disable no-param-reassign */
import { client } from 'api';

import {
  AuthCodeParam, AuthCodeResponse, EmailRegisterParam, EmailRegisterResponse, RegisterParam,
} from 'model/register';
import useUploadToken from 'store/uploadToken';

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

export const uploadFiles = async () => {
  const { data } = await client.post('/owners/upload/files');
  return data;
};

export const getFileUrls = async (param:FormData) => {
  client.interceptors.request.use(
    (config) => {
      const { uploadToken } = useUploadToken();
      if (uploadToken) {
        config.headers.Authorization = `Bearer ${uploadToken}`;
        config.headers['Content-Type'] = 'multipart/form-data';
        config.data = param;
        return config;
      }
      return uploadFiles();
    },
  );
};
