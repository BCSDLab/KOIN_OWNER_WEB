import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './GoMyShopModal.module.scss';

interface CheckModalProps {
  isOpen: boolean;
  onCancel: (event: React.MouseEvent | React.KeyboardEvent<Element>) => void;
}

export default function GoMyShopModal({ isOpen, onCancel }: CheckModalProps) {
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
        <span className={styles['content__main-text']}>신규 메뉴 추가 완료되었습니다.</span>
        <span className={styles['content__sub-text']}>메뉴 관리에서 기존 메뉴의 정보 수정이 가능합니다.</span>
        <Link to="/">
          <button
            type="button"
            className={styles['content__goMyShop-button']}
          >
            내 상점으로
          </button>
        </Link>
      </div>
    </div>,
    document.body,
  );
}
