import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './GoMyShopPopup.module.scss';

interface CheckPopupProps {
  isOpen: boolean;
}

export default function GoMyShopPopup({ isOpen }: CheckPopupProps) {
  if (!isOpen) return null;
  return createPortal(
    <div className={styles.popup}>
      <div className={styles.content}>
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
