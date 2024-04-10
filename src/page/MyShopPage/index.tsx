import useMyShop from 'query/shop';
import useAddMenuStore from 'store/addMenu';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useEffect, useState } from 'react';
import cn from 'utils/ts/className';
import { Portal } from 'component/common/Modal/PortalProvider';
import useModalPortal from 'utils/hooks/useModalPortal';
import showToast from 'utils/ts/showToast';
import ImageModal from 'component/common/Modal/ImageModal';
import CatagoryMenuList from './components/CatagoryMenuList';
import StoreInfo from './components/ShopInfo';
import styles from './MyShopPage.module.scss';
import EditShopInfoModal from './components/EditShopInfoModal';
import MenuTable from './components/MenuTable';
import EventTable from './components/EventTable';

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

  const [tapType, setTapType] = useState('메뉴');
  const portalManager = useModalPortal();

  useEffect(() => {
    refetchShopData();
  }, [refetchShopData, isEditShopInfoModalOpen]);

  useEffect(() => {
    if (!shopData && !isLoading) {
      navigate('/owner/shop-registration');
    }
  }, [shopData, navigate, isLoading]);

  const onClickImage = (img: string[], index: number) => {
    portalManager.open((portalOption: Portal) => (
      <ImageModal imageList={img} imageIndex={index} onClose={portalOption.close} />
    ));
  };

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
          <div className={styles.tap}>
            <button
              className={cn({
                [styles.tap__type]: true,
                [styles['tap__type--active']]: tapType === '메뉴',
              })}
              type="button"
              onClick={() => setTapType('메뉴')}
            >
              메뉴
            </button>
            <button
              className={cn({
                [styles.tap__type]: true,
                [styles['tap__type--active']]: tapType === '이벤트/공지',
              })}
              type="button"
              onClick={() => setTapType('이벤트/공지')}
            >
              이벤트/공지
            </button>
          </div>
          {tapType === '메뉴' ? (
            menusData && menusData.menu_categories.length > 0 && (
            <MenuTable
              storeMenuCategories={menusData.menu_categories}
              onClickImage={onClickImage}
            />
            )
          )
            : (
              <EventTable />
            )}
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
