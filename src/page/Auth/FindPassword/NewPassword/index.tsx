import { ReactComponent as KoinLogo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/blind.svg';
import useRouteCheck from 'page/Auth/FindPassword/hooks/useRouteCheck';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useState } from 'react';
import { useNewPassword } from 'query/auth';
import useEmailAuthStore from 'store/useEmailAuth';
import styles from './NewPassword.module.scss';

export default function NewPassword() {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState(true);
  const { email } = useEmailAuthStore();
  const submit = useNewPassword();
  useRouteCheck('nextStep', '/find-password');

  return (
    <div className={styles.template}>
      <KoinLogo className={styles.logo} />
      <form className={styles.form}>
        <label className={styles.form__label} htmlFor="new-password">
          새 비밀번호
          <div className={styles['input-container']}>
            <input
              className={styles.form__input}
              type={isBlind ? 'password' : 'text'}
              id="new-password"
              placeholder="비밀번호 입력 (필수)"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={styles['cursor-pointer']}
              type="button"
              onClick={changeIsBlind}
            >
              {isBlind ? <BlindIcon /> : <ShowIcon />}
            </button>
          </div>
        </label>
        <span className={styles.form__tip}>
          * 특수문자 포함 영어와 숫자 조합 6~18자리
        </span>
        <label className={styles.form__label} htmlFor="check-password">
          비밀번호 확인
          <div className={styles['form__input-container']}>
            <input
              className={styles.form__input}
              type={isBlind ? 'password' : 'text'}
              id="check-password"
              placeholder="비밀번호 확인 (필수)"
              autoComplete="off"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <button
              className={styles['cursor-pointer']}
              type="button"
              onClick={changeIsBlind}
            >
              {isBlind ? <BlindIcon /> : <ShowIcon />}
            </button>
          </div>
        </label>
        <button
          type="button"
          className={styles.form__button}
          disabled={password !== passwordCheck || password === ''}
          onClick={(e) => {
            e.preventDefault();
            submit({ email, password });
          }}
        >
          다음
        </button>
      </form>
    </div>
  );
}
