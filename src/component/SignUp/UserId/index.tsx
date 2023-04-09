import CustomButton from '../CustomButton';
import styles from './UserId.module.scss';

export default function UserId() {
  return (
    <div>
      <span className={styles.label}>아이디</span>
      <div className={styles.input_wrapper}>
        <input className={styles.id_input} id="id-input" placeholder="이메일 형식 아이디 입력(필수)" />
        <CustomButton content="중복확인" type="small" />
      </div>
      <span className={styles.alert}>사용하실 수 있는 아이디 입니다.</span>
    </div>
  );
}
