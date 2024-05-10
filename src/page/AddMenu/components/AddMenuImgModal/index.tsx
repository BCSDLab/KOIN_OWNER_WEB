import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CancelIcon } from 'assets/svg/addmenu/mobile-cancle-icon.svg';
import useAddMenuStore from 'store/addMenu';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import { UploadError } from 'utils/hooks/useImagesUpload';
import styles from './AddMenuImgModal.module.scss';

interface AddMenuImgModalProps {
  isOpen: boolean;
  closeModal: (event?: React.MouseEvent | React.KeyboardEvent) => void;
  imageObject: {
    imageFile: string[];
    imgRef: React.RefObject<HTMLInputElement>;
    saveImgFile: () => Promise<void>;
    uploadError: UploadError;
    setImageFile: React.Dispatch<React.SetStateAction<string[]>>;
  }
}

export default function AddMenuImgModal({ isOpen, closeModal, imageObject }: AddMenuImgModalProps) {
  const { setImageUrls } = useAddMenuStore();

  const triggerFileInput = () => {
    imageObject.imgRef.current?.click();
  };
  const handleImageChange = async () => {
    await imageObject.saveImgFile();
  };
  const triggerCameraInput = () => {
    imageObject.imgRef.current?.click();
  };
  useEffect(() => {
    if (imageObject.imageFile && !imageObject.uploadError) {
      setImageUrls(imageObject.imageFile);
      closeModal();
    }
  }, [imageObject.imageFile, imageObject.uploadError, setImageUrls, closeModal]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal} onClick={closeModal} onKeyDown={closeModal} role="button" tabIndex={0}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()} role="presentation">
        <button type="button" className={styles['cancel-button']} onClick={closeModal}>
          <CancelIcon className={styles.cancelIcon} />
        </button>
        <span className={styles['content__main-text']}>이미지 추가</span>
        <span className={styles['content__sub-text']}>메뉴 사진을 추가할 수 있습니다.</span>
        <div className={styles['content__button-container']}>
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={imageObject.imgRef} multiple />
          <button type="button" className={styles['content__album-button']} onClick={triggerFileInput}>사진 앨범</button>
          <button type="button" className={styles['content__camera-button']} onClick={triggerCameraInput}>카메라 촬영</button>
        </div>
        <div className={styles['content__image-error-message']}>
          {imageObject.uploadError
            && <ErrorMessage message={ERRORMESSAGE[imageObject.uploadError]} />}
        </div>
      </div>
    </div>,
    document.body,
  );
}
