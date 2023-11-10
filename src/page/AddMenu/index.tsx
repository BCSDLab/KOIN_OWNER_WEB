import React, { useState } from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import MenuImage from './components/MenuImage';
import MenuName from './components/MenuName';
import styles from './AddMenu.module.scss';
import MenuPrice from './components/MenuPrice';
import MenuCategory from './components/MenuCategory';
import MenuDetail from './components/MenuDetail';
import GoMyShopPopup from './components/GoMyShop/GoMyShopPopup';

export default function AddMenu() {
  const [isCheckPopupOpen, setIsCheckPopupOpen] = useState(false);
  const { isMobile } = useMediaQuery();
  const adddmenuCancel = () => {
    console.log('cancle');
  };
  const adddmenuCheck = () => {
    setIsCheckPopupOpen(true);
  };
  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles['mobile__menu-info']}>
            <div className={styles.mobile__caption}>
              메뉴 정보
            </div>
            <div className={styles['mobile__menu-content']}>
              <MenuName />
              <MenuPrice />
              <MenuCategory />
            </div>
          </div>
          <div className={styles['mobile__menu-detail']}>
            <div className={styles.mobile__caption}>
              메뉴 세부
            </div>
            <div className={styles['mobile__menu-content']}>
              <MenuDetail />
              <MenuImage />
            </div>
          </div>
          <div className={styles['mobile__btn-container']}>
            <button
              className={styles['mobile__btn-cancel']}
              type="button"
            >
              취소
            </button>
            <button
              className={styles['mobile__btn-check']}
              type="button"
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.header__title}>메뉴 추가</h1>
            <div className={styles['header__btn-container']}>
              <button
                className={styles['header__btn-cancel']}
                type="button"
                onClick={adddmenuCancel}
              >
                취소
              </button>
              <button
                className={styles['header__btn-check']}
                type="button"
                onClick={adddmenuCheck}
              >
                확인
              </button>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.content__left}>
              <MenuImage />
            </div>
            <div className={styles.content__right}>
              <MenuName />
              <MenuPrice />
              <MenuCategory />
              <MenuDetail />
            </div>
          </div>
          <GoMyShopPopup isOpen={isCheckPopupOpen} />
        </div>
      )}
    </div>
  );
}
