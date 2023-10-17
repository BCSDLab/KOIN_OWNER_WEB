import styles from './ConfirmStore.module.scss';

interface ConfirmStoreProps {
  open: boolean;
  onCancel: () => void;
}

export default function ConfirmStore({ open, onCancel }: ConfirmStoreProps) {
  if (!open) return null;
  return (
    <div className={styles.container}>
      <div className={styles.container__info}>
        <span className={styles.container__title}>가장 맛있는 족발</span>
        <div className={styles.container__text}>
          <span className={styles['container__phone-number-label']}>전화번호</span>
          <span className={styles['container__phone-number']}>041-523-5849</span>
        </div>
      </div>
      <button
        type="button"
        className={styles['container__select-button']}
        onClick={onCancel}
      >
        선택
      </button>
    </div>
  );
}
