import { useMutation } from '@tanstack/react-query';
import { getMe, postLogin } from 'api/auth';
import { LoginClient } from 'model/auth';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'store/user';

const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const { mutate, error, isError } = useMutation({
    mutationFn: (variables: LoginClient) => postLogin({
      email: variables.email, password: variables.password,
    }),
    onSuccess: async (data, variables) => {
      if (data.token) { sessionStorage.setItem('access_token', data.token); }

      if (variables.isAutoLogin) {
        localStorage.setItem('refresh_token', data.refresh_token);
      } else {
        localStorage.removeItem('refresh_token');
      }

      const user = await getMe();
      setUser(user);
      navigate('/');
    },
    onError: () => {
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },

  });

  return { mutate, error: error as { message: string }, isError };
};

export default useLogin;
