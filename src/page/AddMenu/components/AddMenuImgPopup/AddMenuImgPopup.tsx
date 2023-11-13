import { createPortal } from 'react-dom';
import { ReactComponent as CancelIcon } from 'assets/svg/addmenu/mobile-cancel-icon.svg';
import styles from './AddMenuImgPopup.module.scss';

interface AddMenuImgPopupProps {
  isOpen: boolean;
  onCancel: (event: React.MouseEvent) => void;
}

export default function AddMenuImgPopup({ isOpen, onCancel }: AddMenuImgPopupProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.popup}>
      <div className={styles.content}>
        <button
          type="button"
          className={styles['cancel-button']}
          onClick={onCancel}
        >
          <CancelIcon className={styles.cancelIcon} />
        </button>
        <span className={styles['content__main-text']}>이미지 추가</span>
        <span className={styles['content__sub-text']}>메뉴 사진을 추가 할 수 있습니다.</span>
        <div className={styles['content__button-container']}>
          <button
            type="button"
            className={styles['content__from-album-button']}
            onClick={onCancel}
          >
            사진 앨범
          </button>
          <button
            type="button"
            className={styles['content__from-camera-button']}
            onClick={onCancel}
          >
            카메라 촬영
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
