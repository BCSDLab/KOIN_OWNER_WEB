import Header from 'component/common/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserStore from 'store/user';
import useErrorBoundary from 'utils/hooks/useErrorBoundary';
import useUser from 'utils/hooks/user';
import { ZodError } from 'zod';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { setUser } = useUser();
  const { setError } = useErrorBoundary();

  if (!user) {
    setUser()
      .catch((error) => {
        if (error instanceof ZodError) {
          setError(error);
        } else {
          navigate('/login');
        }
      });
  }

  return (
    <div>
      {user && (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
}
