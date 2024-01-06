import styles from './ConfirmStore.module.scss';

interface ConfirmStoreProps {
  open: boolean;
  onCancel: () => void;
  store:{
    name:string,
    tel:string
  }
}

export default function ConfirmStore({ open, onCancel, store }: ConfirmStoreProps) {
  if (!open) return null;
  return (
    <div className={styles.container}>
      <div className={styles.container__info}>
        <span className={styles.container__title}>{store.name}</span>
        <div className={styles.container__text}>
          <span className={styles['container__phone-number-label']}>전화번호</span>
          <span className={styles['container__phone-number']}>{store.tel}</span>
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
