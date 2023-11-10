import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useState } from 'react';

import AddMenuImgPopup from 'page/AddMenu/components/AddMenuImgPopup/AddMenuImgPopup';
import styles from './MenuImage.module.scss';

export default function MenuImage() {
  const [isAddMenuImgPopupOpen, setAddMenuImgPopupOpen] = useState(false);
  const { isMobile } = useMediaQuery();
  const addmenuImg = () => {
    setAddMenuImgPopupOpen(true);
  };
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
          <div className={styles.mobile__newImg__container}>
            <button
              type="button"
              className={styles['mobile__newImg__add-btn']}
              onClick={addmenuImg}
            >
              <ImgPlusIcon className={styles['mobile__new-image__plusIcon']} />
              <div className={styles['mobile__newImg__add-caption']}>이미지 추가</div>
            </button>
          </div>
          <AddMenuImgPopup
            isOpen={isAddMenuImgPopupOpen}
            closePopup={() => setAddMenuImgPopupOpen(false)}
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
          <div className={styles.newImg__container}>
            <div className={styles['newImg__add-btn']}>
              <ImgPlusIcon className={styles.plusIcon} />
              <div className={styles['newImg__add-caption']}>이미지 추가</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
