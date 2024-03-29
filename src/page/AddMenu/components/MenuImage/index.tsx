import React, { useEffect } from 'react';
import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import { ReactComponent as MobileDeleteImgIcon } from 'assets/svg/addmenu/mobile-delete-new-image.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import AddMenuImgModal from 'page/AddMenu/components/AddMenuImgModal';
import useAddMenuStore from 'store/addMenu';
import useImageUpload from 'utils/hooks/useImageUpload';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import styles from './MenuImage.module.scss';

interface MenuImageProps {
  isComplete: boolean;
}

export default function MenuImage({ isComplete }: MenuImageProps) {
  const { isMobile } = useMediaQuery();
  const { imageUrl, setImageUrl, removeImageUrl } = useAddMenuStore();
  const {
    value: isAddMenuImgModal,
    setTrue: openAddMenuImgModal,
    setFalse: closeAddMenuImgModal,
  } = useBooleanState(false);
  const {
    imageFile, imgRef, saveImgFile, uploadError,
  } = useImageUpload();
  const handleAddImage = () => {
    imgRef.current?.click();
  };
  const handleDeleteImage = (image: string) => {
    removeImageUrl(image);
  };
  const handleImageChange = async () => {
    await saveImgFile();
  };
  useEffect(() => {
    if (imageFile) {
      setImageUrl(imageFile);
    }
  }, [imageFile, setImageUrl]);
  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles.mobile__header}>
            <div className={styles.mobile__header__caption}>메뉴사진</div>
            <div className={styles.mobile__header__condition}>(최대 이미지 3장)</div>
          </div>
          <div className={styles['mobile__new-image__container']}>
            {imageUrl.map((image, index) => (
              <div key={image} className={styles['mobile__new-image__item']}>
                <img src={image} alt={`Selected ${index + 1}`} className={styles['mobile__new-image__selected']} />
                {!isComplete && (
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image)}
                  className={styles['mobile__delete-img-button']}
                  aria-label="Delete image"
                >
                  <MobileDeleteImgIcon className={styles['mobile__delete-img-icon']} />
                </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={styles['mobile__new-image__add-btn']}
              onClick={openAddMenuImgModal}
            >
              <ImgPlusIcon className={styles['mobile__new-image__plusIcon']} />
              <div className={styles['mobile__new-image__add-caption']}>이미지 추가</div>
            </button>
          </div>
          <AddMenuImgModal
            isOpen={isAddMenuImgModal}
            closeModal={closeAddMenuImgModal}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header__caption}>메뉴사진</div>
            <div className={styles.header__condition}>(최대 이미지 3장)</div>
          </div>
          <div className={styles['new-image__container']}>
            {imageUrl.map((image, index) => (
              <div key={image} className={styles['new-image__item']}>
                <img src={image} alt={`Selected ${index + 1}`} className={styles['new-image__selected']} />
                {!isComplete && (
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image)}
                  className={styles['new-image__delete-img-button']}
                  aria-label="Delete image"
                >
                  <MobileDeleteImgIcon className={styles['new-image__delete-img-icon']} />
                </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={styles['new-image__add-btn']}
              onClick={handleAddImage}
            >
              <ImgPlusIcon className={styles.plusIcon} />
              <div className={styles['new-image__add-caption']}>이미지 추가</div>
            </button>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={handleImageChange}
              ref={imgRef}
            />
          </div>
          <div className={styles['image-error-message']}>
            {uploadError && <ErrorMessage message={ERRORMESSAGE[uploadError]} />}
          </div>
        </div>
      )}
    </div>
  );
}
