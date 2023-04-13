import styles from './UserPassword.module.scss';

export default function UserPassword() {
  return (
    <div className={styles.form}>
      <span className={styles.form__label}>비밀번호</span>
      <div className={styles['form__input--wrapper']}>
        <input className={styles.form__input} placeholder="비밀번호 입력 (필수)" type="password" />
        <div className={styles['form__visible--button']} />
        <span className={styles.form__alert}>* 특수문자 포함 영어와 숫자 조합 6~18 자리</span>
      </div>
      <div className={styles['form__input--wrapper']}>
        <input className={styles.form__input} placeholder="비밀번호 확인 (필수)" type="password" />
        <div className={styles['form__visible--button']} />
      </div>
    </div>
  );
}
