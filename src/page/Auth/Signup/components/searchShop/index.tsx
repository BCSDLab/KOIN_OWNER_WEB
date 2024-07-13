import { ReactComponent as SearchIcon } from 'assets/svg/auth/search-icon.svg';
import useShopList from 'query/shops';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import cn from 'utils/ts/className';
import { OutletProps } from 'page/Auth/FindPassword/entity';
import styles from './searchShop.module.scss';

interface ShopInfo {
  shop_name: string;
  shop_id: number | null;
}
export default function SearchShop() {
  const [searchText, setSearchText] = useState('');
  const steps = useOutletContext<OutletProps>();
  const { shopList, isError } = useShopList();
  const {
    watch, setValue,
  } = useFormContext<ShopInfo>();
  function handleClickShop(e: React.MouseEvent<HTMLButtonElement>) {
    const { name, id } = JSON.parse(e.currentTarget.value);
    setValue('shop_name', name);
    setValue('shop_id', id);
    steps.setIsShopSelect(true);
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

  useEffect(() => {
    if (searchText === '') {
      setFilteredShopList(shopList?.shops);
    }
  }, [searchText, shopList?.shops]);

  return (
    <div className={styles['search-shop-container']}>
      <div className={styles['search-input-container']}>
        <input
          type="text"
          className={styles['search-shop__input']}
          placeholder="가게를 검색해보세요"
          value={searchText}
          onChange={handleChangeSearchText}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon
          type="button"
          className={styles['search-shop__button']}
          onClick={() => handleSearch()}
        />
      </div>
      <div className={styles['shop-list-container']}>
        {isError && <div>에러가 발생했습니다.</div>}
        {filteredShopList?.map((shop) => (
          <button
            key={shop.id}
            className={cn({
              [styles['shop-card']]: true,
              [styles['shop-card--selected']]: watch('shop_name') === shop.name,
            })}
            value={JSON.stringify({
              name: shop.name,
              id: shop.id,
            })}
            type="button"
            onClick={(e) => {
              handleClickShop(e);
            }}
          >
            <span className={styles['shop-card__title']}>{shop.name}</span>
            <div className={styles['shop-card-info-container']}>
              <span className={cn({
                [styles['shop-card__info']]: true,
                [styles['shop-card__info--activate']]: shop.delivery,
              })}
              >
                배달
              </span>
              <span className={cn({
                [styles['shop-card__info']]: true,
                [styles['shop-card__info--activate']]: shop.pay_card,
              })}
              >
                카드결제
              </span>
              <span className={cn({
                [styles['shop-card__info']]: true,
                [styles['shop-card__info--activate']]: shop.pay_bank,
              })}
              >
                계좌이체
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
