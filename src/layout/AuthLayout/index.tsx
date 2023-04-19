import { Outlet } from 'react-router-dom';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
  const { isMobile } = useMediaQuery();
  return (
    <div className={styles.template}>
      <Outlet />
      <div className={styles.copyright}>
        {isMobile
          ? 'Copyright @ BCSD Lab All rights reserved.'
          : 'COPYRIGHT © 2023 BCSD LAB ALL RIGHTS RESERVED.'}
      </div>
    </div>
  );
}
