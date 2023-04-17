import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
  return (
    <>
      <Outlet />
      <div className={styles.copyright}> COPYRIGHT © 2023 BCSD LAB ALL RIGHTS RESERVED. </div>
    </>
  );
}
