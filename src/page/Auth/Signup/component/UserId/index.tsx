import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import CustomButton from '../CustomButton';
import styles from './UserId.module.scss';

export default function UserId() {
  const { isMobile } = useMediaQuery();
  return (
    !isMobile
      ? (
        <div className={styles.form}>
          <span className={styles.form__label}>아이디</span>
          <div className={styles['input-wrapper']}>
            <input className={styles['input-wrapper__input']} id="id-input" placeholder="이메일 형식 아이디 입력(필수)" />
            <CustomButton content="중복확인" type="small" />
          </div>
          <span className={styles.form__alert}>사용하실 수 있는 아이디 입니다.</span>
        </div>
      )
      : (
        <div className={styles['form__input-wrapper']}>
          <input className={styles['input-wrapper__input--warn']} id="id-input" placeholder="이메일" />
          <div className={styles.form__warn}>
            <Warn />
            <span className={styles['form__warn--phrase']}>이미 가입된 이메일입니다.</span>
          </div>
        </div>
      )
  );
}
