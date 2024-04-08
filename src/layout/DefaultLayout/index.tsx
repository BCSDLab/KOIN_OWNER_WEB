import ErrorBoundary from 'component/common/ErrorBoundary';
import Header from 'component/common/Header';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import usePrevPathStore from 'store/path';
import useUserStore from 'store/user';
import useErrorBoundary from 'utils/hooks/useErrorBoundary';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);
  const setPrevPath = usePrevPathStore((state) => state.setPrevPath);
  const location = useLocation();
  const { handleErrorBoundary } = useErrorBoundary();

  useEffect(() => {
    if (!user) {
      setUser()
        .catch(handleErrorBoundary)
        .catch(() => {
          setPrevPath('/owner/shop-registration');
          navigate('/owner/shop-registration');
        });
    }
  }, [handleErrorBoundary, setUser, setPrevPath, navigate, user]);

  return (
    <div>
      {user && (
      <>
        {location.pathname !== '/owner/shop-registration' && <Header />}
        <ErrorBoundary message="에러가 발생했습니다.">
          <Outlet />
        </ErrorBoundary>
      </>
      )}
    </div>
  );
}
