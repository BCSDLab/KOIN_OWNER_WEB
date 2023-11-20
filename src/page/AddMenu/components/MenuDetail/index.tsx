import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './MenuDetail.module.scss';

export default function MenuDetail() {
  const { isMobile } = useMediaQuery();

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles.mobile__caption}>메뉴구성</div>
          <textarea className={styles['mobile__menu-detail-input']} placeholder=" 예) 불족발(소,중,대) + 막국수 + 랜덤 서비스 음료(500ml)" />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.caption}>메뉴구성</div>
          <textarea className={styles['menu-detail-input']} placeholder=" 예) 불족발(소,중,대) + 막국수 + 랜덤 서비스 음료(500ml)" />
        </div>
      )}
    </div>
  );
}
