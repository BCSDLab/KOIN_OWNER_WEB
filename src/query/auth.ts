import { useMutation } from '@tanstack/react-query';
import {
  postLogin, postLogout, findPasswordVerify, findPassword, newPassword,
} from 'api/auth';
import axios, { AxiosError } from 'axios';
import { LoginForm } from 'model/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorMessageStore } from 'store/errorMessageStore';
import useUserTypeStore from 'store/userType';
import { isKoinError } from 'utils/ts/isKoinError';
import useUserStore from 'store/user';

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
  const { setUserType, setIsAuth } = useUserTypeStore();
  const { setLoginError, setLoginErrorCode } = useErrorMessageStore();

  const { mutate, error, isError } = useMutation({
    mutationFn: (variables: LoginForm) => postLogin({
      email: variables.email, password: variables.password,
    }),
    onSuccess: async (data, variables) => {
      if (data.token) { sessionStorage.setItem('access_token', data.token); }

      if (variables.isAutoLogin) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      setUserType(data.user_type);

      if (data.user_type === 'OWNER') {
        const myShopData = await getMyShopList();
        if (myShopData.count > 0) {
          setPrevPath('/owner');
          navigate('/owner');
        } else {
          setStep(0);
          navigate('/owner/shop-registration');
        }
      } else if (data.user_type === 'COOP') {
        navigate('/coop');
      } else;
    },
    onError: (err: unknown) => {
      if (isKoinError(err)) {
        // TODO: 분기별 에러 처리
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setLoginError(err.message || '로그인에 실패했습니다.');
        setLoginErrorCode(err.code);
      }
    },
  });

  return { login: mutate, error, isError };
};

export const useLogout = () => {
  const { setUserType, setIsAuth } = useUserTypeStore();
  const { removeUser } = useUserStore();

  const { mutate, error, isError } = useMutation({
    mutationFn: async () => {
      await postLogout()
        .then(() => {
          sessionStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          removeUser();
          setUserType('NOT_LOGGED_IN');
          setIsAuth(false);
        });
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
