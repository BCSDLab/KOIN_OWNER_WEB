import MY_STORE_INFO from 'model/storeInfo/myStoreInfo';
import MENU_CATEGORYS from 'model/storeInfo/menuCategory';
import Menus from './components/Menus';
import StoreInfo from './components/StoreInfo';
import styles from './MyStorePage.module.scss';

export default function MyStorePage() {
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
        <StoreInfo storeInfo={MY_STORE_INFO} />
        <div className={styles.menu}>
          <Menus categories={MENU_CATEGORYS} />
        </div>
      </div>
    </div>
  );
}
