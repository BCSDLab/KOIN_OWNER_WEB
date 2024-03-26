import { useMutation } from '@tanstack/react-query';
import {
  postLogin, findPasswordVerify, findPassword, newPassword,
} from 'api/auth';
import { getMyShopList } from 'api/shop';
import axios, { AxiosError } from 'axios';
import { LoginForm } from 'model/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorMessageStore } from 'store/errorMessageStore';
import usePrevPathStore from 'store/path';

interface VerifyInput {
  email: string;
  verify: string;
}

interface ErrorResponse {
  response: undefined | {
    message: string;
    data: {
      code: number;
      message: string;
      violations: {
        field: string;
        message: string;
      }[];
    }
  }
  message: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { setPrevPath } = usePrevPathStore((state) => state);
  const { setLoginError } = useErrorMessageStore();

  const { mutate, error, isError } = useMutation({
    mutationFn: (variables: LoginForm) => postLogin({
      email: variables.email, password: variables.password,
    }),
    onSuccess: async (data, variables) => {
      if (data.token) { sessionStorage.setItem('access_token', data.token); }

      if (variables.isAutoLogin) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      const myShopData = await getMyShopList();
      if (myShopData.count > 0) {
        setPrevPath('/');
        navigate('/');
      } else {
        navigate('/store-registration');
      }
    },
    onError: (err) => {
      console.log('loginerror', err);
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setLoginError(err.message || '로그인에 실패했습니다.');
    },
  });

  return { login: mutate, error, isError };
};

export const useVerifyEmail = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (emailInput: string) => findPasswordVerify({ email: emailInput }),
    onError: (error: AxiosError<ErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || error.message);
      }
    },
  });
  return {
    verifyEmail: {
      mutate, isPending, isSuccess, errorMessage,
    },
  };
};

export const useSubmit = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { mutate: submit, isSuccess, isError } = useMutation({
    mutationFn: ({
      email,
      verify,
    }
    :VerifyInput) => findPassword({ address: email, certificationCode: verify }),
    onSuccess: () => {
      navigate('/new-password', { state: { 'find-password': true }, replace: true });
    },
    onError: (error: ErrorResponse) => {
      setErrorMessage(error.response?.data?.message || error.message);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.violations[0] || error.response?.data.message);
      }
    },
  });
  return {
    authNumber: {
      submit, isSuccess, isError, errorMessage,
    },
  };
};

export const useNewPassword = () => {
  const navigate = useNavigate();
  const { mutate: submit } = useMutation({
    mutationFn: ({ email, password }:
    { email: string, password: string }) => newPassword(
      { address: email, password },
    ),
    onSuccess: () => {
      navigate('/complete-change-password', { state: { 'new-password': true }, replace: true });
    },
    onError: () => {
    },
  });
  return submit;
};
