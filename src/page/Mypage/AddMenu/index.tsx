import styles from './AddMenu.module.scss';

export default function AddMenu() {
  return (
    <>
      <div className={styles.header}>
        메뉴추가
      </div>
      <div className={styles.new_menu}>
        <div className={styles.new_menu__imgs} />
      </div>
    </>
  );
}
