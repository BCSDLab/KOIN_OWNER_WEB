import { createPortal } from 'react-dom';
import CustomButton from 'page/StoreRegistration/component/CustomButton';
import styles from './Category.module.scss';

interface CategoryProps {
  isOpen: boolean;
  modalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CategoryModal({ isOpen, modalHandler } : CategoryProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.content__header}>
          <span className={styles.content__title}>
            카테고리 검색
          </span>
          <button
            type="button"
            id="categoryModal"
            onClick={modalHandler}
            className={styles['content__close-button']}
          >
            X
          </button>
        </div>
        <div className={styles.content__category}>
          카테고리
        </div>
        <div className={styles['content__next-button']}>
          <CustomButton content="다음" buttonType="large" modalId="categoryModal" onClick={modalHandler} />
        </div>
      </div>
    </div>,
    document.body as HTMLElement,
  );
}
