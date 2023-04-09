import styles from './UserPassword.module.scss';

export default function UserPassword() {
  return (
    <div>
      <span className={styles.label}>비밀번호</span>
      <div className={styles.input_wrapper}>
        <input className={styles.password_input} placeholder="비밀번호 입력 (필수)" type="password" />
        <div className={styles.visible_button} />
        <span className={styles.alert}>* 특수문자 포함 영어와 숫자 조합 6~18 자리</span>
      </div>
      <div className={styles.input_wrapper}>
        <input className={styles.password_input} placeholder="비밀번호 확인 (필수)" type="password" />
        <div className={styles.visible_button} />
      </div>
    </div>
  );
}
