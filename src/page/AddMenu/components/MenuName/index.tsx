import styles from './MenuName.module.scss';

export default function MenuName() {
  return (
    <div className={styles.container}>
      <div className={styles.caption}>
        메뉴명
      </div>
      <input
        className={styles.nameInput}
        placeholder="예) 불족발 + 막국수 저녁 SET"
      />
    </div>
  );
}
