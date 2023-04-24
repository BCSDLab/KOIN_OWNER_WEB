import { useMutation } from '@tanstack/react-query';
import { getMe, postLogin } from 'api/auth';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'store/auth';

import { ZodError } from 'zod';

const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const { mutate, error, isError } = useMutation(postLogin, {
    onSuccess: async ({ token }) => {
      sessionStorage.setItem('token', token);
      const sessionToken = sessionStorage.getItem('token');
      if (sessionToken) {
        const authResponse = await getMe(sessionToken);
        setUser(authResponse);
      } else {
        sessionStorage.removeItem('token');
      }
      navigate('/');
    },
    useErrorBoundary: (err) => err instanceof ZodError,
  });

  return { mutate, error: error as { message: string }, isError };
};

export default useLogin;
