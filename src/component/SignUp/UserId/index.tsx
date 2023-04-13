import CustomButton from '../CustomButton';
import styles from './UserId.module.scss';

export default function UserId() {
  return (
    <div className={styles.form}>
      <span className={styles.form__label}>아이디</span>
      <div className={styles['form__input--wrapper']}>
        <input className={styles['form__input--wrapper__input']} id="id-input" placeholder="이메일 형식 아이디 입력(필수)" />
        <CustomButton content="중복확인" type="small" />
      </div>
      <span className={styles.form__alert}>사용하실 수 있는 아이디 입니다.</span>
    </div>
  );
}
