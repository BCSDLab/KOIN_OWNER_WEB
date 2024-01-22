import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyShop from 'query/shop';
import useAddMenuStore from 'store/addMenu';
import { create } from 'zustand';
import MenuImage from './components/MenuImage';
import MenuName from './components/MenuName';
import styles from './AddMenu.module.scss';
import MenuPrice from './components/MenuPrice';
// eslint-disable-next-line import/no-cycle
import { MenuCategory } from './components/MenuCategory';
import MenuDetail from './components/MenuDetail';
import GoMyShopModal from './components/GoMyShop';
import MobileDivide from './components/MobileDivide';

interface CategoryErrorStore {
  categoryError: string;
  setCategoryError: (error: string) => void;
}

export const useCategoryErrorStore = create<CategoryErrorStore>((set) => ({
  categoryError: '',
  setCategoryError: (error) => set({ categoryError: error }),
}));

export default function AddMenu() {
  const { isMobile } = useMediaQuery();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const navigate = useNavigate();
  const { resetCategoryIds } = useAddMenuStore();
  const { setCategoryError } = useCategoryErrorStore();
  const goMyShop = () => {
    navigate('/');
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
  } = useAddMenuStore();
  const { addMenuMutation } = useMyShop();
  const toggleConfirmClick = () => {
    if (categoryIds.length === 0) {
      setCategoryError('카테고리를 1개 이상 선택해주세요.');
      return;
    }
    setCategoryError('');
    setIsComplete((prevState) => !prevState);
  };
  const addMenu = () => {
    const newMenuData = {
      category_ids: categoryIds,
      description,
      image_urls: imageUrl,
      is_single: isSingle,
      name,
      option_prices: optionPrices.map(({ option, price }) => ({
        option: option === '' ? name : option,
        price: typeof price === 'string' ? parseInt(price, 10) : price,
      })),
      single_price: typeof singlePrice === 'string' ? parseInt(singlePrice, 10) : singlePrice,
    };

    addMenuMutation(newMenuData);
  };
  const confirmAddMenu = () => {
    addMenu();
    goMyShop();
  };
  useEffect(
    () => {
      resetCategoryIds();
      setCategoryError('');
    },
    [resetCategoryIds, setCategoryError],
  );
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
                  onClick={confirmAddMenu}
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
            <h1 className={styles.header__title}>메뉴 추가</h1>
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
            onConfirm={addMenu}
          />
        </div>
      )}
    </div>
  );
}
