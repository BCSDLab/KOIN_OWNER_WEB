// import useMyStore from 'query/shop';
// import useMyStoreInfo from 'query/shopInfo';
import useMyShop from 'query/shop';
import CatagoryMenuList from './components/CatagoryMenuList';
// import CatagoryMenuList from './components/CatagoryMenuList';
import StoreInfo from './components/StoreInfo';
import styles from './MyStorePage.module.scss';

export default function MyStorePage() {
  const { shopData, menuData } = useMyShop();
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
      {shopData && (
      <StoreInfo storeInfo={shopData} />
      )}
      {menuData && menuData.menu_categories.map((category) => (
        <CatagoryMenuList
          key={category.name}
          menus={category}
        />
      ))}
    </div>
  );
}
