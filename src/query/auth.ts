import { useMutation } from '@tanstack/react-query';
import { postLogin } from 'api/auth';
import { LoginForm } from 'model/auth';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, error, isError } = useMutation({
    mutationFn: (variables: LoginForm) => postLogin({
      email: variables.email, password: variables.password,
    }),
    onSuccess: (data, variables) => {
      if (data.token) { sessionStorage.setItem('access_token', data.token); }

      if (variables.isAutoLogin) {
        localStorage.setItem('refresh_token', data.refresh_token);
      } else {
        localStorage.removeItem('refresh_token');
      }
      navigate('/');
    },
    onError: () => {
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  });

  return { login: mutate, error, isError };
};

export default useLogin;
