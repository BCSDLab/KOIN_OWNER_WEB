import { ReactComponent as Magnifier } from 'assets/svg/StoreRegistration/magnifier.svg';
import cn from 'utils/ts/className';
import { useState } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import ConfirmStore from 'page/StoreRegistration/component/Modal/ConfirmStore';
import styles from './SearchStore.module.scss';

const DUMMY = [
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: true,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: true,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: true,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
];
interface SearchStoreProps {
  open: boolean;
  onCancel: () => void;
}

export default function SearchStore({ open, onCancel }: SearchStoreProps) {
  const [selectedStore, setSelectedStore] = useState<null | number>(null);
  const { value: showConfirmStore, setValue: setShowConfirmStore } = useBooleanState(false);

  function toggleStore(index:number) {
    if (index !== selectedStore) {
      setSelectedStore(index);
    } else {
      setSelectedStore(null);
    }
  }

  function toggleModal(isOpen:boolean) {
    setShowConfirmStore(isOpen);
  }

  if (!open) return null;
  return (
    <div className={styles.info}>
      <div className={styles.info__search}>
        <input type="text" placeholder="상점 검색" className={styles.info__input} ref={searchInput} onKeyDown={onKeyPress} />
        <Magnifier type="button" className={styles['info__search-button']} onClick={onClickSearchButton} />
      </div>
      <div className={showConfirmStore ? styles['store-list--opend'] : styles['store-list']}>
        {stores.map((shop, index) => (
          <button
            className={cn({
              [styles.store]: true,
              [styles['store--selected']]: selectedStore === index,
            })}
            type="button"
            onClick={() => {
              toggleStore(index);
              toggleModal(index !== selectedStore);
            }}
          >
            <span className={styles.store__title}>{shop.name}</span>
            <div className={styles.store__info}>
              <span className={shop.deliver ? styles.store__text : styles['store__text--impossible']}>배달</span>
              <span className={shop.card ? styles.store__text : styles['store__text--impossible']}>카드결제</span>
              <span className={shop.account ? styles.store__text : styles['store__text--impossible']}>계좌이체</span>
            </div>
          </button>
        ))}
        {selectedStore !== null && (
        <ConfirmStore
          open={showConfirmStore}
          onCancel={onCancel}
          store={DUMMY[selectedStore]}
        />
        )}
      </div>

    </div>
  );
}
