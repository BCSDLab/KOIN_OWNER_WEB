import { Outlet, useNavigate } from 'react-router-dom';
import ErrorBoundary from 'component/common/ErrorBoundary';
import Copyright from 'component/common/Copyright';
import useUserStore from 'store/user';
import { useEffect } from 'react';
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    setUser();
    if (user) {
      navigate('/store-registration', { replace: true });
    }
  }, [setUser, user, navigate]);

  return (
    <div className={styles.template}>
      <ErrorBoundary message="사용자를 로드하는데 실패했습니다.">
        <Outlet />
      </ErrorBoundary>
      <Copyright />
    </div>
  );
}
