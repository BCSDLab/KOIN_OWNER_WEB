import React, { useState } from 'react';
import MenuImage from './components/MenuImage';
import MenuName from './components/MenuName';
import styles from './AddMenu.module.scss';
import MenuPrice from './components/MenuPrice';
import MenuKategorie from './components/MenuKategorie';
import MenuDetail from './components/MenuDetail';
import GoMyShopPopup from './components/GoMyShop/GoMyShopPopup';

export default function AddMenu() {
  const [isCheckPopupOpen, setIsCheckPopupOpen] = useState(false);
  const adddmenuCancel = () => {
    console.log('cancle');
  };
  const adddmenuCheck = () => {
    setIsCheckPopupOpen(true);
  };
  return (
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
          <MenuKategorie />
          <MenuDetail />
        </div>
      </div>
      <GoMyShopPopup isOpen={isCheckPopupOpen} />
    </div>
  );
}
