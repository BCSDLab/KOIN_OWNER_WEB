import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyShop from 'query/shop';
import useAddMenuStore from 'store/addMenu';
import { useErrorMessageStore } from 'store/errorMessageStore';
import useScrollToTop from 'utils/hooks/useScrollToTop';
import useLogger from 'utils/hooks/useLogger';
import ROUTES from 'static/routes';
import { CommonModal } from 'page/Auth/Signup/components/Modals/commonModal';
import MenuImage from './components/MenuImage';
import MenuName from './components/MenuName';
import MenuPrice from './components/MenuPrice';
import MenuCategory from './components/MenuCategory';
import MenuDetail from './components/MenuDetail';
import GoMyShopModal from './components/GoMyShop';
import MobileDivide from './components/MobileDivide';
import useFormValidation from './hook/useFormValidation';
import styles from './AddMenu.module.scss';

export default function AddMenu() {
  useScrollToTop();
  const { isMobile } = useMediaQuery();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { resetAddMenuStore } = useAddMenuStore();
  const { setMenuError, setCategoryError } = useErrorMessageStore();
  const {
    value: isGoMyShopModal,
    setTrue: openGoMyShopModal,
    setFalse: closeGoMyShopModal,
  } = useBooleanState(false);

  const logger = useLogger();

  const {
    categoryIds,
    description,
    imageUrl,
    isSingle,
    name,
    optionPrices,
    singlePrice,
  } = useAddMenuStore();
  const onError = () => {
    setIsShowModal(true);
  };
  const { addMenuMutation } = useMyShop();
  const { validateFields, menuError, categoryError } = useFormValidation(onError);
  const toggleConfirmClick = () => {
    if (validateFields()) {
      setIsComplete((prevState) => !prevState);
    }
  };

  const addMenuMutationEvent = () => {
    const singlePriceValue = isSingle ? singlePrice : null;
    const newMenuData = {
      category_ids: categoryIds,
      description,
      image_urls: imageUrl,
      is_single: isSingle,
      name,
      option_prices: isSingle ? null : optionPrices?.map(({ option, price }) => ({
        option: option === '' ? name : option,
        price: typeof price === 'string' ? parseInt(price, 10) : price,
      })) || null,
      single_price: typeof singlePriceValue === 'string' ? parseInt(singlePriceValue, 10) : singlePriceValue,
    };
    addMenuMutation(newMenuData);
  };

  const onClickMenuAddCancelHandler = () => {
    if (isComplete) {
      toggleConfirmClick();
    } else {
      navigate(ROUTES.Owner.Root());
      logger.actionEventClick({ actionTitle: 'OWNER', title: 'add_menu_cancel', value: '메뉴 추가 취소' });
    }
  };

  const onClickMenuAddConfirmHandler = () => {
    if (isComplete) {
      if (!isMobile) {
        openGoMyShopModal();
        logger.actionEventClick({ actionTitle: 'OWNER', title: 'add_menu_confirm', value: '메뉴 추가 완료' });
        return;
      }
      addMenuMutationEvent();
      logger.actionEventClick({ actionTitle: 'OWNER', title: 'add_menu_confirm', value: '메뉴 추가 완료' });
    } else {
      toggleConfirmClick();
    }
  };

  useEffect(() => {
    resetAddMenuStore();
    setMenuError('');
    setCategoryError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isShowModal && (
      <CommonModal
        title={menuError || categoryError}
        onClose={() => setIsShowModal(false)}
      />
      )}
      {isMobile ? (
        <div>
          <div className={styles['mobile__menu-info']}>
            <div className={styles.mobile__caption}>
              메뉴 정보
            </div>
            <div className={styles['mobile__menu-content']}>
              <MenuName isComplete={isComplete} />
              <MobileDivide />
              <MenuPrice isComplete={isComplete} />
              <MobileDivide />
              <MenuCategory isComplete={isComplete} />
            </div>
          </div>
          <div className={styles['mobile__menu-detail']}>
            <div className={styles.mobile__caption}>
              메뉴 세부
            </div>
            <div className={styles['mobile__menu-content']}>
              <MenuDetail isComplete={isComplete} />
              <MobileDivide />
              <MenuImage isComplete={isComplete} />
            </div>
          </div>
          <div className={styles['mobile__button-container']}>
            <button
              className={styles['mobile__button-cancel']}
              type="button"
              onClick={() => onClickMenuAddCancelHandler()}
            >
              취소
            </button>
            <button
              className={styles['mobile__button-check']}
              type="button"
              onClick={() => onClickMenuAddConfirmHandler()}
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.header__title}>메뉴 추가</h1>
            <div className={styles['header__button-container']}>
              <button
                className={styles['header__button-cancel']}
                type="button"
                onClick={() => onClickMenuAddCancelHandler()}
              >
                취소
              </button>
              <button
                className={styles['header__button-check']}
                type="button"
                onClick={() => onClickMenuAddConfirmHandler()}
              >
                확인
              </button>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.content__left}>
              <MenuImage isComplete={isComplete} />
            </div>
            <div className={styles.content__right}>
              <MenuName isComplete={isComplete} />
              <MenuPrice isComplete={isComplete} />
              <MenuCategory isComplete={isComplete} />
              <MenuDetail isComplete={isComplete} />
            </div>
          </div>
          <GoMyShopModal
            isOpen={isGoMyShopModal}
            onCancel={closeGoMyShopModal}
            onConfirm={addMenuMutationEvent}
            mainMessage="신규 메뉴 추가 완료되었습니다."
            subMessage="메뉴 관리에서 기존 메뉴의 정보 수정이 가능합니다."
          />
        </div>
      )}
    </div>
  );
}
