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

  function handleChangeSearchText(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== '') {
      setFilteredShopList(shopList?.shops.filter(({ name }) => name.includes(e.target.value)));
    } else {
      setFilteredShopList(shopList?.shops);
    }
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
          />
          <SearchIcon
            type="button"
            className={styles['search-shop__button']}
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
      <Button
        onClick={nextStep}
      >
        다음
      </Button>
    </div>
  );
}
