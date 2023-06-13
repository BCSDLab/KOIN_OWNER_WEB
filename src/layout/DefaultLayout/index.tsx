import Header from 'component/common/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserStore from 'store/user';
import useErrorBoundary from 'utils/hooks/useErrorBoundary';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);
  const { handleErrorBoundary } = useErrorBoundary();

  if (!user) {
    setUser()
      .catch(handleErrorBoundary)
      .catch(() => navigate('/login'));
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
