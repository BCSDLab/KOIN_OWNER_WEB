import { ReactComponent as KoinLogo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Blind } from 'assets/svg/auth/blind.svg';
import useRouteCheck from 'page/Auth/FindPassword/hooks/useRouteCheck';
import styles from './NewPassword.module.scss';

export default function NewPassword() {
  useRouteCheck('authCheck', '/find-password');
  return (
    <div className={styles.template}>
      <KoinLogo className={styles.logo} />
      <form className={styles.form}>
        <label className={styles.form__label} htmlFor="new-password">
          새 비밀번호
          <div className={styles['input-container']}>
            <input
              className={styles.form__input}
              type="password"
              id="new-password"
              placeholder="비밀번호 입력 (필수)"
            />
            <Blind className={styles['cursor-pointer']} />
          </div>
        </label>
        <span className={styles.form__tip}>* 특수문자 포함 영어와 숫자 조합 6~18자리</span>
        <label className={styles.form__label} htmlFor="check-password">
          비밀번호 확인
          <div className={styles['form__input-container']}>
            <input
              className={styles.form__input}
              type="password"
              id="check-password"
              placeholder="비밀번호 확인 (필수)"
            />
            <Blind className={styles['cursor-pointer']} />
          </div>
        </label>
        <button type="button" className={styles.form__submit}>다음</button>
      </form>
    </div>
  );
}
