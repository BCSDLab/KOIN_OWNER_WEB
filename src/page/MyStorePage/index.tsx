import useMyShop from 'query/shop';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CatagoryMenuList from './components/CatagoryMenuList';
import StoreInfo from './components/StoreInfo';
import styles from './MyStorePage.module.scss';

export default function MyStorePage() {
  const { isMobile } = useMediaQuery();
  const { shopData, menuData } = useMyShop();
  return (
    <div>
      {isMobile ? (
        <>
          <div className={styles.mobileheader}>
            <h1 className={styles.mobileheader__title}>가게정보</h1>
            <button type="button" className={styles['mobileheader__btn-update']}>메뉴수정</button>
            <button
              type="button"
              className={styles['mobileheader__btn-add']}
            >
              메뉴추가
            </button>
          </div>
          {shopData && (
          <StoreInfo storeInfo={shopData} />
          )}
          {menuData && menuData.menu_categories.map((category) => (
            <CatagoryMenuList
              key={category.id}
              menuCategory={category}
            />
          ))}
        </>
      ) : (
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
              menuCategory={category}
            />
          ))}
        </div>
      )}
    </div>
  );
}
