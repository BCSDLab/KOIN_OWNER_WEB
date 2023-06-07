import React from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './Copyright.module.scss';

export default function Copyright() {
  const { isMobile } = useMediaQuery();
  const year = new Date().getFullYear();

  return (
    <div className={styles.copyright}>
      {isMobile
        ? 'Copyright @ BCSD Lab All rights reserved.'
        : `COPYRIGHT © ${year} BCSD LAB ALL RIGHTS RESERVED.`}
    </div>
  );
}
