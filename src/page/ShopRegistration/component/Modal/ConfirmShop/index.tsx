import useShopRegistrationStore from 'store/shopRegistration';
import styles from './ConfirmShop.module.scss';

interface ShopInfo {
  name: string;
  phone: string;
  id: string;
}

interface ConfirmShopProps {
  open: boolean;
  selectedShop: ShopInfo;
  onCancel: () => void;
}

export default function ConfirmShop({ open, onCancel, selectedShop }: ConfirmShopProps) {
  const { setName, setShopId } = useShopRegistrationStore();
  if (!open) return null;
  return (
    <div className={styles.container}>
      <div className={styles.container__info}>
        <span className={styles.container__title}>{selectedShop.name}</span>
        <div className={styles.container__text}>
          <span className={styles['container__phone-number-label']}>전화번호</span>
          <span className={styles['container__phone-number']}>{selectedShop.phone}</span>
        </div>
      </div>
      <button
        type="button"
        className={styles['container__select-button']}
        onClick={() => {
          setName(selectedShop.name);
          setShopId(selectedShop.id);
          onCancel();
        }}
      >
        선택
      </button>
    </div>
  );
}
