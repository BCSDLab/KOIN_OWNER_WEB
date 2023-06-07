import { Outlet } from 'react-router-dom';
import ErrorBoundary from 'component/common/ErrorBoundary';
import Copyright from 'component/common/Copyright';
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
  return (
    <div className={styles.template}>
      <ErrorBoundary
        message="사용자를 로드하는데 실패했습니다."
      >
        <Outlet />
      </ErrorBoundary>
      <Copyright />
    </div>
  );
}
