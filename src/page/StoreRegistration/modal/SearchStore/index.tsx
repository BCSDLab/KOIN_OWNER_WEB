import { createPortal } from 'react-dom';
import { ReactComponent as Magnifier } from 'assets/svg/mystore/magnifier.svg';
import styles from './SearchStore.module.scss';

interface SearchStoreProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SearchStoreModal({ isOpen, onClose } : SearchStoreProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.content__header}>
          <span className={styles.content__title}>
            가게 검색
          </span>
          <button
            type="button"
            id="searchStoreModal"
            onClick={onClose}
            className={styles.content__button}
          >
            X
          </button>
        </div>
        <div className={styles.info}>
          <div className={styles.info__search}>
            <input type="text" placeholder="상점 검색" className={styles.info__input} />
            <Magnifier />
          </div>
          <div className={styles['store-list']}>
            스토어 리스트
            <div className={styles.store}>
              <span className={styles.store__title}>가장 맛있는 족발</span>
              <div className={styles.store__info}>
                <span className={styles.store__text}>배달</span>
                <span className={styles.store__text}>카드결제</span>
                <span className={styles.store__text}>계좌이체</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body as HTMLElement,
  );
}