import { createPortal } from 'react-dom';
import { ReactComponent as CancleIcon } from 'assets/svg/addmenu/mobile-cancle-icon.svg';
import styles from './AddMenuImgModal.module.scss';

interface AddMenuImgModalProps {
  isOpen: boolean;
  onCancel: (event: React.MouseEvent | React.KeyboardEvent<Element>) => void;
}

export default function AddMenuImgModal({ isOpen, onCancel }: AddMenuImgModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.modal}
      onClick={onCancel}
      onKeyDown={onCancel}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="presentation"
      >
        <button
          type="button"
          className={styles['cancel-button']}
          onClick={onCancel}
        >
          <CancleIcon className={styles.cancelIcon} />
        </button>
        <span className={styles['content__main-text']}>이미지 추가</span>
        <span className={styles['content__sub-text']}>메뉴 사진을 추가 할 수 있습니다.</span>
        <div className={styles['content__button-container']}>
          <button
            type="button"
            className={styles['content__album-button']}
            onClick={onCancel}
          >
            사진 앨범
          </button>
          <button
            type="button"
            className={styles['content__camera-button']}
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
