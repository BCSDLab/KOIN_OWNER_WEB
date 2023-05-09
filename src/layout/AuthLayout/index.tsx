import { Outlet } from 'react-router-dom';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import ErrorBoundary from 'component/common/ErrorBoundary/ErrorBoundary';
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
  const { isMobile } = useMediaQuery();
  const year = new Date().getFullYear();

  return (
    <div className={styles.template}>
      <ErrorBoundary
        message="사용자를 로드하는데 실패했습니다."
      >
        <Outlet />
      </ErrorBoundary>
      <div className={styles.copyright}>
        {isMobile
          ? 'Copyright @ BCSD Lab All rights reserved.'
          : `COPYRIGHT © ${year} BCSD LAB ALL RIGHTS RESERVED.`}
      </div>
    </div>
  );
}
