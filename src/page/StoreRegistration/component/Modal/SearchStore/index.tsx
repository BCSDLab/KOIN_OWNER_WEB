import { ReactComponent as Magnifier } from 'assets/svg/storereg/magnifier.svg';
import cn from 'utils/ts/className';
import { useState } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import ConfirmStore from 'page/StoreRegistration/component/Modal/ConfirmStore';
import styles from './SearchStore.module.scss';

interface SearchStoreProps {
  open: boolean;
  onCancel: () => void;
}

export default function SearchStore({ open, onCancel }: SearchStoreProps) {
  const [selectedStore, setSelectedStore] = useState('');
  const { value: showConfirmStore, setValue: setShowConfirmStore } = useBooleanState(false);

  function toggleStore() {
    setSelectedStore(selectedStore === '가장 맛있는 족발' ? ' ' : '가장 맛있는 족발');
  }

  function toggleModal() {
    setShowConfirmStore((prev) => !prev);
  }

  if (!open) return null;
  return (
    <div className={styles.info}>
      <div className={styles.info__search}>
        <input type="text" placeholder="상점 검색" className={styles.info__input} />
        <Magnifier type="button" className={styles['info__search-button']} />
      </div>
      <div className={styles['store-list']}>
        <button
          className={cn({
            [styles.store]: true,
            [styles['store--selected']]: selectedStore === '가장 맛있는 족발',
          })}
          type="button"
          onClick={() => {
            toggleStore();
            toggleModal();
          }}
        >
          <span className={styles.store__title}>가장 맛있는 족발</span>
          <div className={styles.store__info}>
            <span className={styles.store__text}>배달</span>
            <span className={styles.store__text}>카드결제</span>
            <span className={styles.store__text}>계좌이체</span>
          </div>
        </button>
      </div>
      <ConfirmStore open={showConfirmStore} onCancel={onCancel} />
    </div>
  );
}
