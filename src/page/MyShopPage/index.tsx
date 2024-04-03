import useMyShop from 'query/shop';
import useAddMenuStore from 'store/addMenu';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useEffect, useState } from 'react';
import showToast from 'utils/ts/showToast';
import CatagoryMenuList from './components/CatagoryMenuList';
import StoreInfo from './components/ShopInfo';
import styles from './MyShopPage.module.scss';
import EditShopInfoModal from './components/EditShopInfoModal';

export default function MyShopPage() {
  const { isMobile } = useMediaQuery();
  const {
    shopData, menusData, refetchShopData, isLoading,
  } = useMyShop();
  const { resetAddMenuStore } = useAddMenuStore();
  useEffect(() => {
    resetAddMenuStore();
  }, [resetAddMenuStore]);
  const navigate = useNavigate();
  const {
    setTrue: openEditShopInfoModal,
    setFalse: closeEditShopInfoModal,
    value: isEditShopInfoModalOpen,
  } = useBooleanState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  if (isSuccess) {
    showToast('success', '가게정보가 수정되었습니다.');
    setIsSuccess(false);
  }

  useEffect(() => {
    refetchShopData();
  }, [refetchShopData, isEditShopInfoModalOpen]);

  useEffect(() => {
    if (!shopData && !isLoading) {
      navigate('/shop-registration');
    }
  }, [shopData, navigate, isLoading]);

  if (isMobile && shopData && isEditShopInfoModalOpen) {
    return (
      <>
        <div className={styles.mobileheader}>
          <h1 className={styles.mobileheader__title}>가게정보</h1>
        </div>
        <EditShopInfoModal
          shopInfo={shopData}
          closeModal={closeEditShopInfoModal}
          setIsSuccess={setIsSuccess}
        />
      </>
    );
  }

  return (
    <div>
      {isMobile ? (
        <>
          <div className={styles.mobileheader}>
            <h1 className={styles.mobileheader__title}>가게정보</h1>
            <Link to="/owner/add-menu">
              <button
                type="button"
                className={styles['mobileheader__btn-add']}
              >
                메뉴추가
              </button>
            </Link>
          </div>
          {shopData && (
            <StoreInfo
              shopInfo={shopData}
              openEditShopInfoModal={openEditShopInfoModal}
              closeEditShopInfoModal={closeEditShopInfoModal}
              isEditShopInfoModalOpen={isEditShopInfoModalOpen}
              setIsSuccess={setIsSuccess}
            />
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
            <Link to="/owner/add-menu">
              <button
                type="button"
                className={styles['header__btn-add']}
              >
                메뉴추가
              </button>
            </Link>
          </div>
          {shopData && (
            <StoreInfo
              shopInfo={shopData}
              openEditShopInfoModal={openEditShopInfoModal}
              closeEditShopInfoModal={closeEditShopInfoModal}
              isEditShopInfoModalOpen={isEditShopInfoModalOpen}
              setIsSuccess={setIsSuccess}
            />
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
