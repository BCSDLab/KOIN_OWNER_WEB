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
import useLogger from 'utils/hooks/useLogger';
import ROUTES from 'static/routes';
import CatagoryMenuList from './components/CatagoryMenuList';
import ShopInfo from './components/ShopInfo';
import styles from './MyShopPage.module.scss';
import EditShopInfoModal from './components/EditShopInfoModal';
import MenuTable from './components/MenuTable';
import EventTable from './components/EventTable';
import MyShopList from './components/MyShopList/MyShopList';

export default function MyShopPage() {
  const { isMobile } = useMediaQuery();
  const [listOpen, setListOpen] = useState<boolean>(false);
  const {
    shopData, menusData, refetchShopData, isLoading, myShop,
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

  const logger = useLogger();

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
      navigate(ROUTES.OwnerShopRegistration);
    }
  }, [shopData, navigate, isLoading]);

  const onClickImage = (img: string[], index: number) => {
    portalManager.open((portalOption: Portal) => (
      <ImageModal imageList={img} imageIndex={index} onClose={portalOption.close} />
    ));
  };

  if (isMobile && shopData && isEditShopInfoModalOpen) {
    return (
      <EditShopInfoModal
        shopInfo={shopData}
        closeModal={closeEditShopInfoModal}
        setIsSuccess={setIsSuccess}
      />
    );
  }
  const onCancel = () => {
    setListOpen(false);
  };

  return (
    <div>
      {isMobile ? (
        <>
          <div className={styles['mobile-header']}>
            <Link to={ROUTES.OwnerShopRegistration} className={styles['mobile-header__btn-add']}>가게 추가</Link>
            {myShop.shops.length >= 2
              && (
                <>
                  <button type="button" className={styles['mobile-header__btn-add']} onClick={() => setListOpen(true)}>상점 선택</button>
                  {listOpen && <MyShopList isOpen={listOpen} onCancel={onCancel} />}
                </>
              )}
            <Link to={ROUTES.OwnerAddMenu}>
              <button
                type="button"
                className={styles['mobile-header__btn-add']}
                onClick={() => {
                  logger.actionEventClick({ actionTitle: 'OWNER', title: 'add_menu', value: '메뉴 추가' });
                }}
              >
                메뉴추가
              </button>
            </Link>
          </div>
          {shopData && (
            <ShopInfo
              shopInfo={shopData}
              openEditShopInfoModal={openEditShopInfoModal}
              closeEditShopInfoModal={closeEditShopInfoModal}
              isEditShopInfoModalOpen={isEditShopInfoModalOpen}
              setIsSuccess={setIsSuccess}
              onClickImage={onClickImage}
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
                shopMenuCategories={menusData.menu_categories}
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
            <Link to={ROUTES.OwnerEvent.general(shopData?.id!)}>
              <button
                type="button"
                className={styles['header__btn-add']}
                onClick={() => {
                  logger.actionEventClick({ actionTitle: 'OWNER', title: 'add_event', value: '이벤트 추가' });
                }}
              >
                이벤트 추가
              </button>
            </Link>
            <Link to={ROUTES.OwnerAddMenu}>
              <button
                type="button"
                className={styles['header__btn-add']}
                onClick={() => {
                  logger.actionEventClick({ actionTitle: 'OWNER', title: 'add_menu', value: '메뉴 추가' });
                }}
              >
                메뉴추가
              </button>
            </Link>
          </div>
          {shopData && (
            <ShopInfo
              shopInfo={shopData}
              openEditShopInfoModal={openEditShopInfoModal}
              closeEditShopInfoModal={closeEditShopInfoModal}
              isEditShopInfoModalOpen={isEditShopInfoModalOpen}
              setIsSuccess={setIsSuccess}
              onClickImage={onClickImage}
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
