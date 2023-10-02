import { ReactComponent as Magnifier } from 'assets/svg/storereg/magnifier.svg';
import cn from 'utils/ts/className';
import { useState } from 'react';
import styles from './SearchStore.module.scss';

export default function SearchStore() {
  const [selectedStore, setSelectedStore] = useState('');

  function toggleStore() {
    setSelectedStore(selectedStore === '가장 맛있는 족발' ? ' ' : '가장 맛있는 족발');
  }

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
    </div>
  );
}
