import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/blind.svg';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import useBooleanState from 'utils/hooks/useBooleanState';
import usePasswordConfirm from 'page/Auth/Signup/hooks/usePasswordConfirm';
import styles from './UserPassword.module.scss';

export default function UserPassword() {
  const { isMobile } = useMediaQuery();
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState(true);
  const { passwordRegister, passwordConfirmRegister, errors } = usePasswordConfirm();
  return (
    <form className={styles.form}>
      {!isMobile && <span className={styles.form__label}>비밀번호</span>}
      <div className={styles.form__input}>
        <input
          className={styles.input}
          placeholder={isMobile ? '비밀번호' : '비밀번호 입력 (필수)'}
          type={isBlind ? 'password' : 'text'}
          {...passwordRegister}
          autoComplete="off"
        />
        {!isMobile && (
        <button className={styles['form__visible--button']} type="button" onClick={changeIsBlind}>
          {isBlind ? <BlindIcon /> : <ShowIcon />}
        </button>
        )}
        {errors.password ? (
          <div className={styles.form__warn}>
            <Warn />
            <span className={styles['form__warn--phrase']}>{errors.password.message}</span>
          </div>
        ) : <span className={styles.form__alert}>* 특수문자 포함 영어와 숫자 조합 6~18 자리</span>}

      </div>
      <div className={styles.form__input}>
        <input className={styles.input} placeholder={isMobile ? '비밀번호' : '비밀번호 입력 (필수)'} type={isBlind ? 'password' : 'text'} {...passwordConfirmRegister} autoComplete="off" />
        {!isMobile && (
        <button className={styles['form__visible--button']} type="button" onClick={changeIsBlind}>
          {isBlind ? <BlindIcon /> : <ShowIcon />}
        </button>
        )}
        {errors.passwordConfirm && (
          <div className={styles.form__warn}>
            <Warn />
            <span className={styles['form__warn--phrase']}>{errors.passwordConfirm.message}</span>
          </div>
        )}
      </div>
    </form>
  );
}
