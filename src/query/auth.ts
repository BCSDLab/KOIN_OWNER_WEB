import { useMutation } from '@tanstack/react-query';
import {
  postLogin, findPasswordVerify, findPassword, newPassword,
} from 'api/auth';
import { LoginForm } from 'model/auth';
import { useNavigate } from 'react-router-dom';
import usePrevPathStore from 'store/path';

interface VerifyInput {
  emailInput: string;
  verifyInput: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { prevPath } = usePrevPathStore((state) => state);

  const { mutate, error, isError } = useMutation({
    mutationFn: (variables: LoginForm) => postLogin({
      email: variables.email, password: variables.password,
    }),
    onSuccess: (data, variables) => {
      if (data.token) { sessionStorage.setItem('access_token', data.token); }

      if (variables.isAutoLogin) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }
      navigate(prevPath, { replace: true });
    },
    onError: () => {
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  });

  return { login: mutate, error, isError };
};

export const useVerifyEmail = () => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (emailInput: string) => findPasswordVerify({ email: emailInput }),
  });
  return { verifyEmail: { mutate, isLoading, isSuccess } };
};

export const useSubmit = () => {
  const navigate = useNavigate();
  const { mutate: submit } = useMutation({
    mutationFn: ({
      emailInput,
      verifyInput,
    }
    :VerifyInput) => findPassword({ address: emailInput, certificationCode: verifyInput }),
    onSuccess: () => {
      navigate('/new-password', { state: { authCheck: true }, replace: true });
    },
    onError: () => {
      // TODO: 이메일 인증 실패 시 UI 처리 필요
    },
  });
  return submit;
};

export const useNewPassword = () => {
  const navigate = useNavigate();
  const { mutate: submit } = useMutation({
    mutationFn: ({ emailInput, passwordInput }:
    { emailInput: string, passwordInput: string }) => newPassword(
      { address: emailInput, password: passwordInput },
    ),
    onSuccess: () => {
      navigate('/complete-change-password', { replace: true });
    },
    onError: () => {
    },
  });
  return submit;
};
