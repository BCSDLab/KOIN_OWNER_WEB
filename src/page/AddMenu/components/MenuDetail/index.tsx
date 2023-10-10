import styles from './MenuDetail.module.scss';

export default function MenuDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.caption}>메뉴구성</div>
      <textarea className={styles['menu-detail-input']} placeholder=" 예) 불족발(소,중,대) + 막국수 + 랜덤 서비스 음료(500ml)" />
    </div>
  );
}
