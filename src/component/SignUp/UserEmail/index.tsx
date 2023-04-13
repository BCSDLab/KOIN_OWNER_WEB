import CustomButton from '../CustomButton';
import styles from './UserEmail.module.scss';

export default function UserEmail() {
  return (
    <div className={styles.form}>
      <span className={styles.form__label}>이메일 인증</span>
      <div className={styles['form__input--wrapper']}>
        <input className={styles.form__input} type="text" placeholder="이메일 입력@example.com" />
        <input className={styles.form__input} type="text" placeholder="인증번호" />
      </div>
      <span className={styles.form__alert}>* 제한시간 5 : 00</span>
      <CustomButton type="large" content="인증번호 발송" />
    </div>
  );
}
