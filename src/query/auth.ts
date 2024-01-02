import { useMutation } from '@tanstack/react-query';
import {
  postLogin, findPasswordVerify, findPassword, newPassword,
} from 'api/auth';
import { LoginForm } from 'model/auth';
import { useNavigate } from 'react-router-dom';
import usePrevPathStore from 'store/path';

interface VerifyInput {
  email: string;
  verify: string;
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
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (emailInput: string) => findPasswordVerify({ email: emailInput }),
  });
  return { verifyEmail: { mutate, isPending, isSuccess } };
};

export const useSubmit = () => {
  const navigate = useNavigate();
  const { mutate: submit } = useMutation({
    mutationFn: ({
      email,
      verify,
    }
    :VerifyInput) => findPassword({ address: email, certificationCode: verify }),
    onSuccess: () => {
      navigate('/new-password', { state: { nextStep: true }, replace: true });
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
    mutationFn: ({ email, password }:
    { email: string, password: string }) => newPassword(
      { address: email, password },
    ),
    onSuccess: () => {
      navigate('/complete-change-password', { state: { nextStep: true }, replace: true });
    },
    onError: () => {
    },
  });
  return submit;
};
