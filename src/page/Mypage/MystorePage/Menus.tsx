import styles from './MystorePage.module.scss';

export default function Menus() {
  return (
    <div className={styles.menu__wrapper}>
      <div className={styles.menu__item}>
        <div className={styles.menu__img}>이미지</div>
      </div>
      <div className={styles.menu__item}>
        <div className={styles.menu__img}>이미지</div>
      </div>
      <div className={styles.menu__item}>
        <div className={styles.menu__img}>이미지</div>
      </div>
    </div>
  );
}
