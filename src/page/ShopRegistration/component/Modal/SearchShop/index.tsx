import { ReactComponent as Magnifier } from 'assets/svg/shopRegistration/magnifier.svg';
import cn from 'utils/ts/className';
import { ChangeEvent, useEffect, useState } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import ConfirmShop from 'page/ShopRegistration/component/Modal/ConfirmShop';
import useShopList from 'query/shops';
import styles from './SearchShop.module.scss';

interface SearchShopProps {
  open: boolean;
  onCancel: () => void;
}

export default function SearchShop({ open, onCancel }: SearchShopProps) {
  const [selectedShop, setSelectedShop] = useState({
    name: '',
    phone: '',
    id: '',
  });
  const { value: showConfirmShop, setValue: setConfirmShop } = useBooleanState(false);
  const [searchText, setSearchText] = useState('');

  const { shopList, isError } = useShopList();

  function handleClickShop(e: React.MouseEvent<HTMLButtonElement>) {
    const { name, phone, id } = JSON.parse(e.currentTarget.value);
    if (!showConfirmShop) {
      setSelectedShop({
        name,
        phone,
        id,
      });
    } else {
      setSelectedShop({
        name: '',
        phone: '',
        id: '',
      });
    }
  }

  const [filteredShopList, setFilteredShopList] = useState(shopList?.shops);

  function handleSearch() {
    if (searchText !== '') {
      setFilteredShopList(shopList?.shops.filter(({ name }) => name.includes(searchText)));
    }
  }

  function handleChangeSearchText(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  function toggleConfirmShop() {
    setConfirmShop((prev) => !prev);
  }

  useEffect(() => {
    if (searchText === '') {
      setFilteredShopList(shopList?.shops);
    }
  }, [searchText, shopList?.shops]);

  if (!open) return null;
  return (
    <div className={styles.info}>
      <div className={styles.info__search}>
        <input
          type="text"
          placeholder="상점 검색"
          value={searchText}
          onChange={handleChangeSearchText}
          onKeyDown={handleKeyDown}
          className={styles.info__input}
        />
        <Magnifier
          type="button"
          className={styles['info__search-button']}
          onClick={() => handleSearch()}
        />
      </div>
      <div className={styles['shop-list']}>
        {isError && <div>에러가 발생했습니다.</div>}
        {filteredShopList?.map((shop) => (
          <button
            key={shop.id}
            className={cn({
              [styles.shop]: true,
              [styles['shop--selected']]: selectedShop.name === shop.name,
            })}
            value={JSON.stringify({
              name: shop.name,
              phone: shop.phone,
              id: shop.id,
            })}
            type="button"
            onClick={(e) => {
              handleClickShop(e);
              toggleConfirmShop();
            }}
          >
            <span className={styles.shop__title}>{shop.name}</span>
            <div className={styles.shop__info}>
              <span className={cn({
                [styles.shop__delivery]: true,
                [styles['shop__delivery--selected']]: shop.delivery,
              })}
              >
                배달
              </span>
              <span className={cn({
                [styles['shop__pay-card']]: true,
                [styles['shop__pay-card--selected']]: shop.pay_card,
              })}
              >
                카드결제
              </span>
              <span className={cn({
                [styles['shop__pay-bank']]: true,
                [styles['shop__pay-bank--selected']]: shop.pay_bank,
              })}
              >
                계좌이체
              </span>
            </div>
          </button>
        ))}
      </div>
      <ConfirmShop open={showConfirmShop} onCancel={onCancel} selectedShop={selectedShop} />
    </div>
  );
}
