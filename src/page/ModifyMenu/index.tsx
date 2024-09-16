import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import assert from 'assert';
import useMenuInfo, { useDeleteMenu } from 'query/menu';
import useAddMenuStore from 'store/addMenu';
import MenuImage from 'page/AddMenu/components/MenuImage';
import MenuName from 'page/AddMenu/components/MenuName';
import styles from 'page/ModifyMenu/ModifyMenu.module.scss';
import MenuPrice from 'page/AddMenu/components/MenuPrice';
import MenuCategory from 'page/AddMenu/components/MenuCategory';
import MenuDetail from 'page/AddMenu/components/MenuDetail';
import GoMyShopModal from 'page/AddMenu/components/GoMyShop';
import MobileDivide from 'page/AddMenu/components/MobileDivide';
import useScrollToTop from 'utils/hooks/useScrollToTop';
import useFormValidation from 'page/AddMenu/hook/useFormValidation';
import ROUTES from 'static/routes';

export default function ModifyMenu() {
  useScrollToTop();
  const { isMobile } = useMediaQuery();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { validateFields } = useFormValidation();
  const toggleConfirmClick = () => {
    if (validateFields()) {
      setIsComplete((prevState) => !prevState);
    }
  };
  const { id } = useParams();

  assert(id != null, 'menuId가 없습니다.');
  const navigate = useNavigate();
  const { menuData, refetch, modifyMenuMutation } = useMenuInfo(Number(id));
  useEffect(() => {
    refetch();
  }, [refetch]);
  const goMyShop = () => {
    navigate(ROUTES.Owner());
  };

  const { deleteMenuMutation } = useDeleteMenu();

  const handleMobileDeleteMenu = () => {
    deleteMenuMutation(Number(id));
    goMyShop();
  };

  const {
    value: isGoMyShopModal,
    setTrue: openGoMyShopModal,
    setFalse: closeGoMyShopModal,
  } = useBooleanState(false);
  const {
    categoryIds,
    description,
    imageUrl,
    isSingle,
    name,
    optionPrices,
    singlePrice,
    setMenuInfo,
    setOptionPrices,
  } = useAddMenuStore();
  // 처음 메뉴 데이터 초기화
  useEffect(() => {
    if (menuData) {
      setMenuInfo(menuData);
    }
    if (menuData?.option_prices === null) {
      setOptionPrices([{ id: 0, option: '', price: 0 }]);
    }
  }, [menuData, setMenuInfo, setOptionPrices]);
  const createMenuData = () => {
    if (isSingle) {
      return {
        category_ids: categoryIds,
        description,
        image_urls: imageUrl,
        is_single: isSingle,
        name,
        single_price: typeof singlePrice === 'string' ? Number(singlePrice) : singlePrice || 0,
        option_prices: [],
      };
    }

    return {
      category_ids: categoryIds,
      description,
      image_urls: imageUrl,
      is_single: isSingle,
      name,
      single_price: 0,
      option_prices: optionPrices?.map(({ option, price }) => ({
        option: option === '' ? name : option,
        price: typeof price === 'string' ? Number(price) : price,
      })) || [],
    };
  };

  const modifyMenu = () => {
    const newMenuData = createMenuData();
    modifyMenuMutation(newMenuData);
  };

  const confirmModifyMenu = () => {
    if (isComplete) {
      if (!isMobile) {
        openGoMyShopModal();
        return;
      }
      modifyMenu();
      goMyShop();
      return;
    }
    toggleConfirmClick();
  };

  const handleDeleteMenu = () => {
    deleteMenuMutation(Number(id));
    openGoMyShopModal();
  };

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles['mobile__menu-info']}>
            <div className={styles['mobile__delete-menu--container']}>
              <button
                className={styles['mobile__delete-menu--button']}
                type="button"
                onClick={handleMobileDeleteMenu}
              >
                메뉴 삭제
              </button>
            </div>
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
            {isComplete ? (
              <>
                <button
                  className={styles['mobile__button-cancel']}
                  type="button"
                  onClick={toggleConfirmClick}
                >
                  취소
                </button>
                <button
                  className={styles['mobile__button-check']}
                  type="button"
                  onClick={confirmModifyMenu}
                >
                  확인
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles['mobile__button-cancel']}
                  type="button"
                  onClick={goMyShop}
                >
                  취소
                </button>
                <button
                  className={styles['mobile__button-check']}
                  type="button"
                  onClick={toggleConfirmClick}
                >
                  확인
                </button>
              </>
            )}

          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.header__title}>메뉴 수정</h1>
            <div className={styles['header__button-container']}>
              {isComplete ? (
                <>
                  <button
                    className={styles['header__button-cancel']}
                    type="button"
                    onClick={toggleConfirmClick}
                  >
                    취소
                  </button>
                  <button
                    className={styles['header__button-check']}
                    type="button"
                    onClick={openGoMyShopModal}
                  >
                    확인
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles['header__button-cancel']}
                    type="button"
                    onClick={goMyShop}
                  >
                    취소
                  </button>
                  <button
                    className={styles['header__button-check']}
                    type="button"
                    onClick={toggleConfirmClick}
                  >
                    확인
                  </button>
                </>
              )}
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
              <div className={styles['delete-menu-container']}>
                <button
                  className={styles['delete-menu-button']}
                  type="button"
                  onClick={handleDeleteMenu}
                >
                  메뉴 삭제
                </button>
              </div>
            </div>
          </div>
          <GoMyShopModal
            isOpen={isGoMyShopModal}
            onCancel={closeGoMyShopModal}
            onConfirm={modifyMenu}
            mainMessage="메뉴 수정이 완료되었습니다."
            subMessage="메뉴 관리에서 기존 메뉴의 정보 수정이 가능합니다."
          />
        </div>
      )}
    </div>
  );
}
