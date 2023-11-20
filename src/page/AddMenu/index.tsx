import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useState } from 'react';
import MenuImage from './components/MenuImage';
import MenuName from './components/MenuName';
import styles from './AddMenu.module.scss';
import MenuPrice from './components/MenuPrice';
import MenuCategory from './components/MenuCategory';
import MenuDetail from './components/MenuDetail';
import GoMyShopModal from './components/GoMyShop';
import MobileDivide from './components/MobileDivide';

export default function AddMenu() {
  const { isMobile } = useMediaQuery();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const toggleConfirmClick = () => {
    setIsComplete((prevState) => !prevState);
  };
  const {
    value: isGoMyShopModal,
    setTrue: openGoMyShopModal,
    setFalse: closeGOMyShopModal,
  } = useBooleanState(false);
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
              <MenuPrice />
              <MobileDivide />
              <MenuCategory />
            </div>
          </div>
          <div className={styles['mobile__menu-detail']}>
            <div className={styles.mobile__caption}>
              메뉴 세부
            </div>
            <div className={styles['mobile__menu-content']}>
              <MenuDetail />
              <MobileDivide />
              <MenuImage />
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
                  onClick={openGoMyShopModal}
                >
                  확인
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles['mobile__button-cancel']}
                  type="button"
                  onClick={openGoMyShopModal}
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
              <button
                className={styles['header__button-cancel']}
                type="button"
              >
                취소
              </button>
              {isComplete ? (
                <button
                  className={styles['header__button-check']}
                  type="button"
                  onClick={openGoMyShopModal}
                >
                  확인
                </button>
              ) : (
                <button
                  className={styles['header__button-check']}
                  type="button"
                  onClick={toggleConfirmClick}
                >
                  확인
                </button>
              )}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.content__left}>
              <MenuImage />
            </div>
            <div className={styles.content__right}>
              <MenuName isComplete={isComplete} />
              <MenuPrice />
              <MenuCategory />
              <MenuDetail />
            </div>
          </div>
          <GoMyShopModal isOpen={isGoMyShopModal} onCancel={closeGOMyShopModal} />
        </div>
      )}
    </div>
  );
}
