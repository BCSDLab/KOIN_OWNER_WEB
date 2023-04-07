import styles from './Login.module.scss';
import { ReactComponent as Logo } from '../../../assets/svg/common/koin-logo.svg';

export default function Login() {
  return (
    <div className={styles.template}>
      <div className={styles.contents}>
        <Logo className={styles.logo} />
        <div className={styles.form}>
          <input className={styles.form__input} type="text" placeholder="아이디 입력" />
          <input className={styles.form__input} type="password" placeholder="비밀번호 입력" />
          <button className={styles.form__button} type="submit">로그인</button>
        </div>
      </div>
    </div>
  );
}
