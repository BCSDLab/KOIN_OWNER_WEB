import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/blind.svg';
import useBooleanState from 'utils/hooks/useBooleanState';
import usePasswordConfirm from 'page/Auth/Signup/hooks/usePasswordConfirm';
import { RegisterData } from 'page/Auth/Signup/types/Register';

import { SubmitHandler } from 'react-hook-form';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import styles from './UserPassword.module.scss';

interface PasswordInputProps {
  setPassword: (data:RegisterData) => void,
  userData?: RegisterData
}

export default function UserPassword({ setPassword, userData }:PasswordInputProps) {
  const { isMobile } = useMediaQuery();
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState(true);
  const {
    passwordRegister, passwordConfirmRegister, errors: formErrors, handleSubmit,
  } = usePasswordConfirm();
  const onSubmit:SubmitHandler<RegisterData> = (data) => {
    setPassword({ ...userData, password: data.password });
  };
  return (
    <div className={styles.form}>
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
        {formErrors.password ? (<ErrorMessage message={formErrors.password.message} />
        ) : <span className={styles.form__alert}>* 특수문자 포함 영어와 숫자 조합 6~18 자리</span>}
      </div>
      <div className={styles.form__input} onChange={handleSubmit(onSubmit)}>
        <input className={styles.input} placeholder={isMobile ? '비밀번호' : '비밀번호 입력 (필수)'} type={isBlind ? 'password' : 'text'} {...passwordConfirmRegister} autoComplete="off" />
        {!isMobile && (
        <button className={styles['form__visible--button']} type="button" onClick={changeIsBlind}>
          {isBlind ? <BlindIcon /> : <ShowIcon />}
        </button>
        )}
        {formErrors.passwordConfirm
        && <ErrorMessage message={formErrors.passwordConfirm.message} />}
      </div>
    </div>
  );
}
