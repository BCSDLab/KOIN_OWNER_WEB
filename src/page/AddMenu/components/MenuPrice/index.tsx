import useMediaQuery from 'utils/hooks/useMediaQuery';

import { ReactComponent as PlusIcon } from 'assets/svg/main/plus.svg';
import { ReactComponent as CancleIcon } from 'assets/svg/mystore/x-in-circle-cancle.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/svg/mystore/check-circle.svg';
import { ReactComponent as MobilePlusIcon } from 'assets/svg/addmenu/mobile-plus-icon.svg';
import MobileDivide from 'page/AddMenu/components/MobileDivide';

import styles from './MenuPrice.module.scss';

export default function MenuPrice() {
  const { isMobile } = useMediaQuery();
  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles.mobile__header}>
            <div className={styles['mobile__header-title']}>가격</div>
            <div className={styles['mobile__header-condition']}>
              <div className={styles['mobile__header-condition__text']}>단일메뉴</div>
              <CheckCircleIcon className={styles['mobile__header-condition__icon']} />
            </div>
          </div>
          <div className={styles['mobile__price-info-input-box']}>
            <div className={styles['mobile__price-info-inputs']}>
              <input className={styles['mobile__size-input']} placeholder="예) 소 (1~2 인분)" />
              <input className={styles['mobile__price-input']} placeholder="원" />
            </div>
            <CancleIcon className={styles['mobile__cancle-icon']} />
          </div>
          <div className={styles['mobile__add-price-button']}>
            <MobilePlusIcon className={styles['mobile__add-price-button__icon']} />
            <div className={styles['mobile__add-price-button__text']}>가격 추가</div>
          </div>
          <MobileDivide />
        </div>
      ) : (
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
      )}
    </div>
  );
}
