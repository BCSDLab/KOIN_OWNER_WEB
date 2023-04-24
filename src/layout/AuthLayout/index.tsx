import { Outlet } from 'react-router-dom';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import ErrorBoundary from 'component/common/ErrorBoundary';
import Error from 'component/common/Error';
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
  const { isMobile } = useMediaQuery();

  return (
    <div className={styles.template}>
      <ErrorBoundary
        fallback={Error}
        message="사용자를 로드하는데 실패했습니다."
      >
        <Outlet />
      </ErrorBoundary>
      <div className={styles.copyright}>
        {isMobile
          ? 'Copyright @ BCSD Lab All rights reserved.'
          : 'COPYRIGHT © 2023 BCSD LAB ALL RIGHTS RESERVED.'}
      </div>
    </div>
  );
}
