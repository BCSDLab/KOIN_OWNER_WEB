import { Outlet } from 'react-router-dom';
import { ReactComponent as KoinLogo } from 'assets/svg/auth/koin-logo.svg';
import styles from './SendAuthNumber.module.scss';

export default function FindPassword() {
  return (
    <>
      <div className={styles.template}>
        <KoinLogo className={styles.logo} />
        <form className={styles.form}>
          <label className={styles.form__label} htmlFor="email">
            이메일 입력
            <input
              className={styles.form__input}
              type="text"
              id="email"
            />
          </label>
          <label className={styles.form__label} htmlFor="auth-num">
            인증번호 보내기
            <div className={styles.send_container}>
              <input
                className={`${styles.form__input} ${styles['form__input--auth']}`}
                type="text"
                id="auth-num"
              />
              <button type="button" className={styles.send_auth}>인증번호 발송</button>
            </div>
          </label>
          <button type="button" className={styles.submit}>다음</button>
        </form>
      </div>
      <Outlet />
    </>
  );
}
