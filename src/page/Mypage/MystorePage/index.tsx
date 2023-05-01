import MY_STORE_INFO from 'static/myStoreInfo';
import styles from './MystorePage.module.scss';
import Menus from './Menus';

import StoreInfo from './StoreInfo';

export default function MystorePage() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.header}>
          <h1 className={styles.header__title}>가게정보</h1>
          <div className={styles['header__btn-wrapper']}>
            <button type="button" className={styles['header__btn-update']}>메뉴수정</button>
            <button
              type="button"
              className={styles['header__btn-add']}
            >
              메뉴추가
            </button>
          </div>
        </div>
        <StoreInfo storeInfo={MY_STORE_INFO[0]} />
        <div className={styles.menu}>
          <Menus />
        </div>
      </div>
    </div>
  );
}
