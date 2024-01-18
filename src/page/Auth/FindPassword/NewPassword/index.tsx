import { ReactComponent as KoinLogo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/blind.svg';
import { ReactComponent as ErrorIcon } from 'assets/svg/error/auth-error.svg';
import { useRouteCheck } from 'page/Auth/FindPassword/hooks/useRouteCheck';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useState } from 'react';
import { useNewPassword } from 'query/auth';
import useEmailAuthStore from 'store/useEmailAuth';
import cn from 'utils/ts/className';
import sha256 from 'utils/ts/SHA-256';
import styles from './NewPassword.module.scss';

export default function NewPassword() {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState(true);
  const { email } = useEmailAuthStore();
  const submit = useNewPassword();
  useRouteCheck('find-password', '/find-password');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);

    const PASSWORD_REG_EX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,18}$/;
    if (!PASSWORD_REG_EX.test(value)) {
      setPasswordError('비밀번호가 조건에 충족하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPasswordCheck(value);

    if (password !== value) {
      setPasswordCheckError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordCheckError('');
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const hashedPassword = await sha256(password);
    if (!passwordError) {
      submit({ email, password: hashedPassword });
    }
  };

  return (
    <div className={styles.template}>
      <KoinLogo className={styles.logo} />
      <form className={styles.form}>
        <label className={styles.form__label} htmlFor="new-password">
          새 비밀번호
          <div className={
            cn({
              [styles['form__input-container']]: true,
              [styles['form__input-container--error']]: passwordError,
            })
          }
          >
            <input
              className={styles.form__input}
              type={isBlind ? 'password' : 'text'}
              id="new-password"
              placeholder="비밀번호 입력 (필수)"
              autoComplete="off"
              onBlur={handlePasswordChange}
              onChange={handlePasswordChange}
            />
            <button
              className={styles['cursor-pointer']}
              type="button"
              onClick={changeIsBlind}
            >
              {isBlind ? <BlindIcon /> : <ShowIcon />}
            </button>
          </div>
          {passwordError && (
          <span
            className={styles.form__error}
          >
            <ErrorIcon />
            {passwordError}
          </span>
          )}
        </label>
        <span className={cn({
          [styles.form__tip]: true,
          [styles['form__tip--error']]: passwordError,
        })}
        >
          * 특수문자 포함 영어와 숫자 조합 6~18자리
        </span>
        <label className={styles.form__label} htmlFor="check-password">
          비밀번호 확인
          <div className={
            cn({
              [styles['form__input-container']]: true,
              [styles['form__input-container--error']]: passwordCheckError,
            })
          }
          >
            <input
              className={styles.form__input}
              type={isBlind ? 'password' : 'text'}
              id="check-password"
              placeholder="비밀번호 확인 (필수)"
              autoComplete="off"
              onChange={handlePasswordCheckChange}
            />
            <button
              className={styles['cursor-pointer']}
              type="button"
              onClick={changeIsBlind}
            >
              {isBlind ? <BlindIcon /> : <ShowIcon />}
            </button>
          </div>
          {passwordCheckError && (
          <span
            className={styles.form__error}
          >
            <ErrorIcon />
            {passwordCheckError}
          </span>
          )}
        </label>
        <button
          type="button"
          className={styles.form__button}
          disabled={password !== passwordCheck || password === '' || passwordError !== '' || passwordCheckError !== ''}
          onClick={handleSubmit}
        >
          다음
        </button>
      </form>
    </div>
  );
}
