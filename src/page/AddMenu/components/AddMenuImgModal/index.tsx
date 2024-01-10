import React from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CancelIcon } from 'assets/svg/addmenu/mobile-cancle-icon.svg';
import useMenuImageUpload from 'page/AddMenu/hook/useMenuImageUpload';
import styles from './AddMenuImgModal.module.scss';

interface AddMenuImgModalProps {
  isOpen: boolean;
  closeModal: (event?: React.MouseEvent | React.KeyboardEvent) => void;
}

export default function AddMenuImgModal({ isOpen, closeModal }: AddMenuImgModalProps) {
  const { imgRef, saveImgFile } = useMenuImageUpload();

  const handleFileChange = () => {
    saveImgFile();
    closeModal();
  };

  const triggerFileInput = () => {
    imgRef.current?.click();
  };

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
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} ref={imgRef} />
          <button type="button" className={styles['content__album-button']} onClick={triggerFileInput}>사진 앨범</button>
          <button type="button" className={styles['content__camera-button']} onClick={closeModal}>카메라 촬영</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
