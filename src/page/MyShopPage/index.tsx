/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import useMyShop from 'query/shop';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getMe } from 'api/auth';
import CatagoryMenuList from './components/CatagoryMenuList';
import StoreInfo from './components/ShopInfo';
import styles from './MyShopPage.module.scss';

export default function MyShopPage() {
  const { isMobile } = useMediaQuery();
  const {
    shopData, menusData,
  } = useMyShop();
  const navigate = useNavigate();

  useEffect(() => {
    const shopCount = async function getShopCount() {
      try {
        const res = await getMe();
        const shopsCount = res.shops.length;
        return shopsCount;
      } catch (error) {
        alert('내정보를 불러오는데 실패했습니다.');
        navigate('/login');
      }
    };
    (async () => {
      const count = await shopCount();
      if (count === 0) {
        navigate('/store-registration');
      }
    })();
  }, [navigate]);

  return (
    <div>
      {isMobile ? (
        <>
          <div className={styles.mobileheader}>
            <h1 className={styles.mobileheader__title}>가게정보</h1>
            <button type="button" className={styles['mobileheader__btn-update']}>메뉴수정</button>
            <Link to="/add-menu">
              <button
                type="button"
                className={styles['mobileheader__btn-add']}
              >
                메뉴추가
              </button>
            </Link>
          </div>
          {shopData && (
          <StoreInfo shopInfo={shopData} />
          )}
          {menusData && menusData.menu_categories.map((category) => (
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
            <Link to="/add-menu">
              <button
                type="button"
                className={styles['header__btn-add']}
              >
                메뉴추가
              </button>
            </Link>
          </div>
          {shopData && (
          <StoreInfo shopInfo={shopData} />
          )}
          {menusData && menusData.menu_categories.map((category) => (
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
