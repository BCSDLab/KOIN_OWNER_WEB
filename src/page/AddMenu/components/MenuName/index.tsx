import useMediaQuery from 'utils/hooks/useMediaQuery';
import MobileDivide from 'page/AddMenu/components/MobileDivide';

import styles from './MenuName.module.scss';

export default function MenuName() {
  const { isMobile } = useMediaQuery();

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles.mobile__caption}>
            메뉴명
          </div>
          <input
            className={styles.mobile__nameInput}
            placeholder="예) 불족발 + 막국수 저녁 SET"
          />
          <MobileDivide />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.caption}>
            메뉴명
          </div>
          <input
            className={styles.nameInput}
            placeholder="예) 불족발 + 막국수 저녁 SET"
          />
        </div>
      )}
    </div>
  );
}
