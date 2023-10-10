import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import styles from './MenuImage.module.scss';

export default function MenuImage() {
  return (
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
  );
}
