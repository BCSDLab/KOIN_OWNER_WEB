import styles from './Toast.module.scss';

interface ToastProps {
  name:string,
  number:string,
}

export default function Toast({ name, number }:ToastProps) {
  return (
    <div className={styles.toast}>
      <div className={styles.toast__content}>
        <span className={styles['content__store-name']}>{name}</span>
        <div className={styles['content__store-number']}>
          <span className={styles['content__store-number--label']}>전화번호</span>
          <span className={styles['content__store-number--detail']}>{number}</span>
        </div>
      </div>
      <button type="button" className={styles['toast__select-button']}>선택</button>
    </div>
  );
}
