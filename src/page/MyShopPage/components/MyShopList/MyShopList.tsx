import { useQueryClient } from '@tanstack/react-query';
import useMyShop from 'query/shop';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyShopList.module.scss';

const useSelectMyShop = () => {
  const { myShop } = useMyShop();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const selectShop = (myShopId: number) => {
    queryClient.invalidateQueries({ queryKey: ['myShop', myShopId] });
    localStorage.setItem('myShopId', String(myShopId));
    navigate('/');
  };

  return { myShop, selectShop };
};

interface Props {
  setListOpen: (bool: boolean) => void;
}

export default function MyShopList({ setListOpen }: Props) {
  const { myShop, selectShop } = useSelectMyShop();
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <button
          type="button"
          onClick={() => setListOpen(false)}
          className={styles.close}
        >
          x
        </button>
        <Suspense fallback={<div />}>
          {myShop.shops.map((shop, idx) => (
            <button
              type="button"
              onClick={() => {
                setListOpen(false);
                selectShop(shop.id);
              }}
            >
              {idx + 1}
              .
              {' '}
              {shop.name}
            </button>
          ))}
        </Suspense>
      </div>
    </div>
  );
}
