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
    // @ChoiWonBeen 토큰없음 에러제거. TODO: setUser가 에러를 다루는 문제 제거
    setUser().catch(() => {});
    if (user) {
      navigate('/', { replace: true });
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
