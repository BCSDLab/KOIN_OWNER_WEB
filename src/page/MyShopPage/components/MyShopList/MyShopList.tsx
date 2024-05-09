import { useQueryClient } from '@tanstack/react-query';
import CustomModal from 'component/common/CustomModal';
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
  isOpen: boolean;
  onCancel: () => void
}

export default function MyShopList({ isOpen, onCancel }: Props) {
  const { myShop, selectShop } = useSelectMyShop();
  return (
    <CustomModal
      title="가게 선택"
      hasFooter={false}
      isOpen={isOpen}
      onCancel={onCancel}
      isOverflowVisible={false}
      modalSize="small"
    >
      <Suspense fallback={<div />}>
        <div className={styles.modal}>
          {myShop.shops.map((shop, idx) => (
            <button
              type="button"
              onClick={() => {
                onCancel();
                selectShop(shop.id);
              }}
            >
              <h2>
                {`${idx + 1}. ${shop.name}`}
              </h2>
            </button>
          ))}
        </div>
      </Suspense>
    </CustomModal>
  );
}
