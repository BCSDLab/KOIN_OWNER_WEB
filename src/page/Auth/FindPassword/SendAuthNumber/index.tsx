import { Outlet } from 'react-router-dom';
import { ReactComponent as KoinLogo } from 'assets/svg/auth/koin-logo.svg';
import { useState } from 'react';
import cn from 'utils/ts/className';
import { useVerifyEmail, useSubmit } from 'query/auth';
import styles from './SendAuthNumber.module.scss';

export default function FindPassword() {
  const [emailInput, setEmailInput] = useState('');
  const [verifyInput, setVerifyInput] = useState('');
  const { verifyEmail } = useVerifyEmail();
  const submit = useSubmit();

  return (
    <>
      <div className={styles.template}>
        <KoinLogo className={styles.logo} />
        <form className={styles.form}>
          <label className={styles.form__label} htmlFor="email">
            이메일 입력
            <div className={styles['auth-container']}>
              <input
                className={cn({
                  [styles.form__input]: true,
                  [styles['form__input--auth']]: true,
                })}
                onChange={(e) => setEmailInput(e.target.value)}
                type="text"
                id="email"
              />
              <button
                type="button"
                className={styles['auth-button']}
                onClick={() => verifyEmail.mutate(emailInput)}
                disabled={verifyEmail.isLoading}
              >
                {verifyEmail.isSuccess ? '재발송' : '인증번호 발송'}
              </button>
            </div>
          </label>
          <label className={styles.form__label} htmlFor="auth-num">
            인증번호 보내기
            <input
              className={styles.form__input}
              type="text"
              id="auth-num"
              onChange={(e) => setVerifyInput(e.target.value)}
            />
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submit({ emailInput, verifyInput });
            }}
            className={styles.submit}
            disabled={!verifyEmail.isSuccess}
          >
            다음
          </button>
        </form>
      </div>
      <Outlet />
    </>
  );
}
