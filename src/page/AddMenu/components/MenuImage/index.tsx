import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './MenuImage.module.scss';

export default function MenuImage() {
  const { isMobile } = useMediaQuery();
  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles.mobile__header}>
            <div className={styles.mobile__header__caption}>
              메뉴사진
            </div>
            <div className={styles.mobile__header__condition}>
              (최대 이미지 3장)
            </div>
          </div>
          <div className={styles.mobile__newImg__container}>
            <div className={styles['mobile__newImg__add-btn']}>
              <ImgPlusIcon className={styles.mobile__newImg__plusIcon} />
              <div className={styles['mobile__newImg__add-caption']}>이미지 추가</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header__caption}>
              메뉴사진
            </div>
            <div className={styles.header__condition}>
              (최대 이미지 3장)
            </div>
          </div>
          <div className={styles.newImg__container}>
            <div className={styles['newImg__add-btn']}>
              <ImgPlusIcon className={styles.plusIcon} />
              <div className={styles['newImg__add-caption']}>이미지 추가</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
