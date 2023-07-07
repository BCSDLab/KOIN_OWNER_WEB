import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/blind.svg';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import useBooleanState from 'utils/hooks/useBooleanState';
import usePasswordConfirm from 'page/Auth/Signup/hooks/usePasswordConfirm';
import { RegisterData } from 'page/Auth/Signup/types/RegisterData';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler } from 'react-hook-form';
import styles from './UserPassword.module.scss';

interface PasswordInputProps {
  setPassword: (data:RegisterData) => void,
  userData?: RegisterData
}

export default function UserPassword({ setPassword, userData }:PasswordInputProps) {
  const { isMobile } = useMediaQuery();
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState(true);
  const {
    passwordRegister, passwordConfirmRegister, errors, handleSubmit,
  } = usePasswordConfirm();
  const onSubmit:SubmitHandler<RegisterData> = (data) => {
    setPassword({ ...userData, password: data.password });
  };
  return (
    <div className={styles.form} onChange={handleSubmit(onSubmit)}>
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
    </div>
  );
}
