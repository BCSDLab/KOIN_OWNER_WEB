import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import { ReactComponent as MobileDeleteImgIcon } from 'assets/svg/addmenu/mobile-delete-new-image.svg'; // Ensure correct import
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useState } from 'react';
import AddMenuImgModal from 'page/AddMenu/components/AddMenuImgModal';
import styles from './MenuImage.module.scss';

interface MenuImageProps {
  isComplete:boolean;
}

export default function MenuImage({ isComplete }:MenuImageProps) {
  const { isMobile } = useMediaQuery();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [ableselecrteImage, setableselecrteImage] = useState(true);
  const {
    value: isAddMenuImgModal,
    setTrue: openAddMenuImgModal,
    setFalse: closeAddMenuImgModal,
  } = useBooleanState(false);
  const handleDeleteImage = (image: string) => {
    setSelectedImages((prevImages) => prevImages.filter((img) => img !== image));
  };
  const handleImageSelect = (imageData: string) => {
    if (selectedImages.length < 3) {
      setSelectedImages((prevImages: string[]) => [...prevImages, imageData]);
    } else {
      setableselecrteImage(false);
    }
    closeAddMenuImgModal();
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
          <div className={styles['mobile__new-image__container']}>
            {ableselecrteImage && (
            <button
              type="button"
              className={styles['mobile__new-image__add-btn']}
              onClick={openAddMenuImgModal}
            >
              <ImgPlusIcon className={styles['mobile__new-image__plusIcon']} />
              <div className={styles['mobile__new-image__add-caption']}>이미지 추가</div>
            </button>
            )}
            {selectedImages.map((image, index) => (
              <div key={image} className={styles['mobile__new-image__item']}>
                <img src={image} alt={`Selected ${index + 1}`} className={styles['mobile__new-image__selected-image']} />
                {isComplete || (
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image)}
                    className={styles['mobile__delete-img-button']}
                    aria-label="Delete image"
                  >
                    <MobileDeleteImgIcon className={styles['mobile__delete-img-button__icon']} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <AddMenuImgModal
            isOpen={isAddMenuImgModal}
            onCancel={closeAddMenuImgModal}
            onImageSelect={handleImageSelect}
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
