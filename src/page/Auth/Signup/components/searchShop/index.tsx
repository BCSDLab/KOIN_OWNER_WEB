import SearchIcon from 'assets/svg/auth/search-icon.svg?react';
import useShopList from 'query/shops';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'utils/ts/className';
import { Button } from 'page/Auth/components/Common/form';
import styles from './searchShop.module.scss';

interface ShopInfo {
  shop_name: string;
  shop_id: number | null;
}

interface ShopRes {
  id: number;
  name: string;
  phone: string;
  delivery: boolean;
  pay_bank: boolean;
  pay_card: boolean;
  open: {
    day_of_week: string;
    closed: boolean;
    open_time: string | null;
    close_time: string | null;
  }[];
  category_ids: number[];
  main_category_id?: number;
}

export default function SearchShop({ nextStep }: { nextStep: () => void }) {
  const { shopList, isError } = useShopList();
  const {
    watch, setValue,
  } = useFormContext<ShopInfo>();

  function handleClickShop(e: React.MouseEvent<HTMLButtonElement>) {
    const { name, id } = JSON.parse(e.currentTarget.value);
    setValue('shop_name', name);
    setValue('shop_id', id);
  }

  const [filteredShopList, setFilteredShopList] = useState(shopList?.shops);
  const [searchedShopList, setSearchedShopList] = useState<ShopRes[] | undefined>([]);
  const [isFocus, setIsFocus] = useState(false);

  function handleChangeSearchText(e: ChangeEvent<HTMLInputElement>) {
    if (!isFocus) {
      setIsFocus(true);
    }
    if (e.target.value !== '') {
      setSearchedShopList(shopList?.shops.filter(({ name }) => name.includes(e.target.value)));
    } else {
      setSearchedShopList([]);
      setFilteredShopList(shopList?.shops);
    }
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    const keyword = e.currentTarget.value;
    if (e.key === 'Enter' && keyword) {
      setFilteredShopList(shopList?.shops.filter((
        { name },
      ) => name.includes(keyword)));
      setIsFocus(false);
    }
  }

  function handleSearchShopClick(id: number) {
    setFilteredShopList(shopList?.shops.filter((shop) => shop.id === id));
  }

  useEffect(() => {
    if (shopList?.shops) {
      setFilteredShopList(shopList?.shops);
    }
  }, [shopList]);

  return (
    <div className={styles['search-shop-container']}>
      <div>
        <div className={styles['search-input-container']}>
          <input
            type="text"
            className={styles['search-shop__input']}
            placeholder="가게를 검색해보세요"
            onChange={handleChangeSearchText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onKeyDown={handleKeydown}
          />
          <SearchIcon
            type="button"
            className={styles['search-shop__button']}
          />
          {isFocus && (
          <div className={styles['search-list']}>
            {searchedShopList?.map((shop) => (
              <button
                type="button"
                key={shop.id}
                className={styles['search-list__item']}
                onMouseDown={() => handleSearchShopClick(shop.id)}
              >
                {shop.name}
              </button>
            ))}
          </div>
          )}
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
      <Button
        onClick={nextStep}
        disabled={!watch('shop_name')}
      >
        다음
      </Button>
    </div>
  );
}
