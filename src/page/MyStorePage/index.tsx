import MY_STORE_INFO from 'model/storeInfo/myStoreInfo';
import MENU_CATEGORYS from 'model/storeInfo/menuCategory';
import CatagoryMenuList from './components/CatagoryMenuList';
import StoreInfo from './components/StoreInfo';
import styles from './MyStorePage.module.scss';

export default function MyStorePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>가게정보</h1>
        <button type="button" className={styles['header__btn-update']}>메뉴수정</button>
        <button
          type="button"
          className={styles['header__btn-add']}
        >
          메뉴추가
        </button>
      </div>
      <StoreInfo storeInfo={MY_STORE_INFO} />
      {MENU_CATEGORYS.map((category) => (
        <CatagoryMenuList
          menus={category.menus}
          name={category.name}
        />
      ))}
    </div>
  );
}
