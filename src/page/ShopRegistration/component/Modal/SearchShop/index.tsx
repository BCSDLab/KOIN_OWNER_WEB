import { ReactComponent as Magnifier } from 'assets/svg/shopRegistration/magnifier.svg';
import cn from 'utils/ts/className';
import { ChangeEvent, useState } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import ConfirmShop from 'page/ShopRegistration/component/Modal/ConfirmShop';
import useAllShops from 'query/shops';
import styles from './SearchShop.module.scss';

interface SearchShopProps {
  open: boolean;
  onCancel: () => void;
}

export default function SearchShop({ open, onCancel }: SearchShopProps) {
  const [selectedStore, setSelectedStore] = useState({
    name: '',
    phone: '',
  });
  const { value: showConfirmStore, setValue: setConfirmStore } = useBooleanState(false);
  const [searchText, setSearchText] = useState('');

  const { shopList } = useAllShops();

  function handleClickStore(e: React.MouseEvent<HTMLButtonElement>) {
    const { name, phone } = JSON.parse(e.currentTarget.value);
    if (!showConfirmStore) {
      setSelectedStore({
        name,
        phone,
      });
    } else {
      setSelectedStore({
        name: '',
        phone: '',
      });
    }
  }

  function handleChangeSearchText(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function toggleConfirmStore() {
    setConfirmStore((prev) => !prev);
  }

  const [filteredShopList, setFilteredShopList] = useState(shopList?.shops);
  setFilteredShopList(shopList?.shops.filter((shop) => shop.name.includes(searchText)));

  if (!open) return null;
  return (
    <div className={styles.info}>
      <div className={styles.info__search}>
        <input
          type="text"
          placeholder="상점 검색"
          value={searchText}
          onChange={handleChangeSearchText}
          className={styles.info__input}
        />
        <Magnifier type="button" className={styles['info__search-button']} />
      </div>
      <div className={styles['store-list']}>
        {filteredShopList?.map((shop) => (
          <button
            key={shop.id}
            className={cn({
              [styles.store]: true,
              [styles['store--selected']]: selectedStore.name === shop.name,
            })}
            value={JSON.stringify({
              name: shop.name,
              phone: shop.phone,
            })}
            type="button"
            onClick={(e) => {
              handleClickStore(e);
              toggleConfirmStore();
            }}
          >
            <span className={styles.store__title}>{shop.name}</span>
            <div className={styles.store__info}>
              <span className={cn({
                [styles.store__delivery]: true,
                [styles['store__delivery--selected']]: shop.delivery,
              })}
              >
                배달
              </span>
              <span className={cn({
                [styles['store__pay-card']]: true,
                [styles['store__pay-card--selected']]: shop.pay_card,
              })}
              >
                카드결제
              </span>
              <span className={cn({
                [styles['store__pay-bank']]: true,
                [styles['store__pay-bank--selected']]: shop.pay_bank,
              })}
              >
                계좌이체
              </span>
            </div>
          </button>
        ))}
      </div>
      <ConfirmShop open={showConfirmStore} onCancel={onCancel} selectedShop={selectedStore} />
    </div>
  );
}
