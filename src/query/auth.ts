import { useMutation } from '@tanstack/react-query';
import { postLogin } from 'api/auth';
import { LoginClient } from 'model/auth';
import useSetUser from 'utils/hooks/user';

const useLogin = () => {
  const { setUser } = useSetUser();

  const { mutate, error, isError } = useMutation({
    mutationFn: (variables: LoginClient) => postLogin({
      email: variables.email, password: variables.password,
    }),
    onSuccess: (data, variables) => {
      if (data.token) { sessionStorage.setItem('access_token', data.token); }

      if (variables.isAutoLogin) {
        localStorage.setItem('refresh_token', data.refresh_token);
      } else {
        localStorage.removeItem('refresh_token');
      }

      setUser();
    },
    onError: () => {
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  });

  return { mutate, error: error as { message: string }, isError };
};

export default useLogin;
