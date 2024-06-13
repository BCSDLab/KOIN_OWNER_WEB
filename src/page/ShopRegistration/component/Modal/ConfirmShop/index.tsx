import { useFormContext } from 'react-hook-form';
import styles from './ConfirmShop.module.scss';

interface ConfirmShopProps {
  onCancel: () => void;
}

export default function ConfirmShop({ onCancel }: ConfirmShopProps) {
  const { getValues } = useFormContext();
  const values = getValues();
  return (
    <div className={styles.container}>
      <div className={styles.container__info}>
        <span className={styles.container__title}>{values.name}</span>
        <div className={styles.container__text}>
          <span className={styles['container__phone-number-label']}>전화번호</span>
          <span className={styles['container__phone-number']}>{values.phone}</span>
        </div>
      </div>
      <button
        type="button"
        className={styles['container__select-button']}
        onClick={() => {
          onCancel();
        }}
      >
        선택
      </button>
    </div>
  );
}
