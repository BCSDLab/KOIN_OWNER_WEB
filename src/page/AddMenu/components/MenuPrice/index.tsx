import { ReactComponent as PlusIcon } from 'assets/svg/main/plus.svg';
import { ReactComponent as CancleIcon } from 'assets/svg/mystore/x-in-circle-cancle.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/svg/mystore/check-circle.svg';

import styles from './MenuPrice.module.scss';

export default function MenuPrice() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header__title}>가격</div>
        <div className={styles.header__condition}>
          <div className={styles['header__condition-text']}>단일메뉴</div>
          <CheckCircleIcon className={styles['header__condition-icon']} />
        </div>
      </div>
      <div className={styles['price-info-inputs']}>
        <input className={styles['size-input']} placeholder="예) 소 (1~2 인분)" />
        <input className={styles['price-input']} placeholder="원" />
        <CancleIcon className={styles['cancle-icon']} />
      </div>
      <div className={styles['add-price-button']}>
        <PlusIcon className={styles['add-price-button__icon']} />
        <div className={styles['add-price-button__text']}>가격 추가</div>
      </div>
    </div>
  );
}
