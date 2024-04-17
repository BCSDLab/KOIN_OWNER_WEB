import { useMutation } from '@tanstack/react-query';
import {
  postLogin, postLogout, findPasswordVerify, findPassword, newPassword,
} from 'api/auth';
import axios, { AxiosError } from 'axios';
import { LoginForm } from 'model/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorMessageStore } from 'store/errorMessageStore';
import useUserTypeStore from 'store/useUserTypeStore';
import useUserStore from 'store/user';
import { isKoinError, sendClientError } from '@bcsdlab/koin';

interface VerifyInput {
  email: string;
  verify: string;
}

export interface ErrorResponse {
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
  const { setUserType } = useUserTypeStore();
  const { setLoginError } = useErrorMessageStore();

  const {
    mutate, error, isError, isSuccess,
  } = useMutation({
    mutationFn: (variables: LoginForm) => postLogin({
      email: variables.email, password: variables.password,
    }),
    onSuccess: async (data, variables) => {
      if (data.token) { sessionStorage.setItem('access_token', data.token); }

      if (variables.isAutoLogin) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      setUserType();
    },
    onError: (err) => {
      if (isKoinError(err)) {
        setLoginError(err.message || '로그인을 실패했습니다.');
        if (err.status === 401) {
          setLoginError('비밀번호가 일치하지 않습니다.');
        }
        if (err.status === 403) {
          setLoginError('이메일 인증을 완료해주세요.');
        }
        if (err.status === 404) {
          setLoginError('가입되지 않은 이메일입니다.');
        }
        if (err.status === 500) {
          setLoginError('서버 오류가 발생했습니다.');
        }
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    },
  });

  return {
    login: mutate, error, isError, isSuccess,
  };
};

export const useLogout = () => {
  const { setUserType } = useUserTypeStore();
  const { removeUser } = useUserStore();
  const { setLogoutError, setLogoutErrorCode } = useErrorMessageStore();

  const { mutate, error, isError } = useMutation({
    mutationFn: async () => {
      const response = await postLogout();
      if (response) {
        return true;
      }
      throw new Error('로그아웃 실패');
    },
    onSuccess: () => {
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      removeUser();
      setUserType();
    },
    onError: (err) => {
      if (isKoinError(err)) {
        setLogoutError(err.message || '로그아웃을 실패했습니다.');
        setLogoutErrorCode(err.code);
      } else {
        sendClientError(error);
      }
    },
  });

  return { logout: mutate, error, isError };
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
