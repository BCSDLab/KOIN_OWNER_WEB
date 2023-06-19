import ErrorBoundary from 'component/common/ErrorBoundary';
import Header from 'component/common/Header';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import usePrevPathStore from 'store/path';
import useUserStore from 'store/user';
import useErrorBoundary from 'utils/hooks/useErrorBoundary';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);
  const setPrevPath = usePrevPathStore((state) => state.setPrevPath);
  const { handleErrorBoundary } = useErrorBoundary();

  useEffect(() => {
    if (!user) {
      setUser()
        .catch(handleErrorBoundary)
        .catch(() => {
          setPrevPath('/store-registration');
          navigate('/login', { replace: true });
        });
    }
  }, [handleErrorBoundary, setUser, setPrevPath, navigate, user]);

  return (
    <div>
      {user && (
        <>
          <Header />
          <ErrorBoundary message="에러가 발생했습니다.">
            <Outlet />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}
