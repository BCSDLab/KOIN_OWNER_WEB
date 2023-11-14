import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';

import AddMenuImgPopup from 'page/AddMenu/components/AddMenuImgModal/AddMenuImgModal';
import styles from './MenuImage.module.scss';

export default function MenuImage() {
  const { isMobile } = useMediaQuery();
  const {
    value: isAddMenuImgPopup,
    setTrue: openAddMenuImgPopup,
    setFalse: closeAddMenuImgPopup,
  } = useBooleanState(false);
  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles.mobile__header}>
            <div className={styles.mobile__header__caption}>
              메뉴사진
            </div>
            <div className={styles.mobile__header__condition}>
              (최대 이미지 3장)
            </div>
          </div>
          <div className={styles['mobile__new-image__container']}>
            <button
              type="button"
              className={styles['mobile__new-image__add-btn']}
              onClick={openAddMenuImgPopup}
            >
              <ImgPlusIcon className={styles['mobile__new-image__plusIcon']} />
              <div className={styles['mobile__new-image__add-caption']}>이미지 추가</div>
            </button>
          </div>
          <AddMenuImgPopup
            isOpen={isAddMenuImgPopup}
            onCancel={closeAddMenuImgPopup}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header__caption}>
              메뉴사진
            </div>
            <div className={styles.header__condition}>
              (최대 이미지 3장)
            </div>
          </div>
          <div className={styles['new-image__container']}>
            <div className={styles['new-image__add-btn']}>
              <ImgPlusIcon className={styles.plusIcon} />
              <div className={styles['new-image__add-caption']}>이미지 추가</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
