import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import ROUTES from 'static/routes';
import styles from './GoMyShopModal.module.scss';

interface CheckModalProps {
  isOpen: boolean;
  onCancel: (event: React.MouseEvent | React.KeyboardEvent<Element>) => void;
  onConfirm: () => void;
  mainMessage: string;
  subMessage:string;
}

export default function GoMyShopModal({
  isOpen, onCancel, onConfirm, mainMessage, subMessage,
}: CheckModalProps) {
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
        <span className={styles['content__main-text']}>{mainMessage}</span>
        <span className={styles['content__sub-text']}>{subMessage}</span>
        <Link to={ROUTES.Main}>
          <button
            type="button"
            className={styles['content__goMyShop-button']}
            onClick={onConfirm}
          >
            내 상점으로
          </button>
        </Link>
      </div>
    </div>,
    document.body,
  );
}
