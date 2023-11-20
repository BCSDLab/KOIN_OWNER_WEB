import { useMutation } from '@tanstack/react-query';
import { postLogin, findPasswordVerify, findPassword } from 'api/auth';
import { LoginForm } from 'model/auth';
import { useNavigate } from 'react-router-dom';
import usePrevPathStore from 'store/path';

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

export const useVerifyEmail = (emailInput: string) => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: () => findPasswordVerify({ email: emailInput }),
  });
  return {
    verifyEmail: mutate, mutate, isLoading, isSuccess,
  };
};

export const useSubmit = (emailInput: string, verifyInput:string) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => findPassword({ address: emailInput, certificationCode: verifyInput }),
    onSuccess: () => {
      navigate('/new-password', { state: { authCheck: true }, replace: true });
    },
    onError: () => {
      // TODO: 이메일 인증 실패 시 UI 처리 필요
    },
  });
  return { submit: mutate, mutate };
};
