import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import assert from 'assert';
import useMenuInfo from 'query/menu';
import useAddMenuStore from 'store/addMenu';
import MenuImage from 'page/AddMenu/components/MenuImage';
import MenuName from 'page/AddMenu/components/MenuName';
import styles from 'page/AddMenu/AddMenu.module.scss';
import MenuPrice from 'page/AddMenu/components/MenuPrice';
import MenuCategory from 'page/AddMenu/components/MenuCategory';
import MenuDetail from 'page/AddMenu/components/MenuDetail';
import GoMyShopModal from 'page/AddMenu/components/GoMyShop';
import MobileDivide from 'page/AddMenu/components/MobileDivide';

export default function ModifyMenu() {
  const { isMobile } = useMediaQuery();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { menuId } = useParams();
  assert(menuId != null, 'menuId가 없습니다.');
  const navigate = useNavigate();
  const { menuData, modifyMenuMutation } = useMenuInfo(Number(menuId));
  const goMyShop = () => {
    navigate('/');
  };
  const toggleConfirmClick = () => {
    setIsComplete((prevState) => !prevState);
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
  } = useAddMenuStore();
  // 처음 메뉴 데이터 초기화
  setMenuInfo(menuData);
  assert(optionPrices != null, 'single메뉴입니다.');
  assert(singlePrice != null, 'multi메뉴입니다.');
  const createMenuData = () => {
    if (isSingle) {
      return {
        id: Number(menuId),
        category_ids: categoryIds,
        description,
        image_urls: imageUrl,
        is_single: isSingle,
        name,
        single_price: typeof singlePrice === 'string' ? parseInt(singlePrice, 10) : singlePrice,
        option_prices: null,
        is_hidden: false,
      };
    }

    return {
      id: Number(menuId),
      category_ids: categoryIds,
      description,
      image_urls: imageUrl,
      is_single: isSingle,
      name,
      single_price: null,
      option_prices: optionPrices.map(({ option, price }) => ({
        option: option === '' ? name : option,
        price: typeof price === 'string' ? parseInt(price, 10) : price,
      })),
      is_hidden: false,
    };
  };

  const modifyMenu = () => {
    const newMenuData = createMenuData();
    modifyMenuMutation(newMenuData);
  };

  const confirmModifyMenu = () => {
    modifyMenu();
    goMyShop();
  };
  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
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
            </div>
          </div>
          <GoMyShopModal
            isOpen={isGoMyShopModal}
            onCancel={closeGoMyShopModal}
            onConfirm={modifyMenu}
          />
        </div>
      )}
    </div>
  );
}
