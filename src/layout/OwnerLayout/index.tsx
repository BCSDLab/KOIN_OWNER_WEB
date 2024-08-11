import ErrorBoundary from 'component/common/ErrorBoundary';
import Header from 'component/common/Header';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ROUTES from 'static/routes';
import usePrevPathStore from 'store/path';
import useUserStore from 'store/user';
import useErrorBoundary from 'utils/hooks/useErrorBoundary';

export default function OwnerLayout() {
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
          setPrevPath(ROUTES.OWNER_SHOPREGISTRATION);
          navigate(ROUTES.OWNER_SHOPREGISTRATION);
        });
    }
  }, [handleErrorBoundary, setUser, setPrevPath, navigate, user]);

  return (
    <div>
      {user && (
        <>
          {location.pathname !== ROUTES.OWNER_SHOPREGISTRATION && <Header />}
          <ErrorBoundary message="에러가 발생했습니다.">
            <Outlet />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}
