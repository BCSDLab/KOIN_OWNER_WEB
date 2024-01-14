import { Outlet } from 'react-router-dom';
import { ReactComponent as KoinLogo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as ErrorIcon } from 'assets/svg/error/auth-error.svg';
import { useEffect, useState } from 'react';
import cn from 'utils/ts/className';
import { useVerifyEmail, useSubmit } from 'query/auth';
import useEmailAuthStore from 'store/useEmailAuth';
import styles from './SendAuthNumber.module.scss';

export default function FindPassword() {
  const { email, setEmail } = useEmailAuthStore();
  const [verify, setVerify] = useState('');
  const { verifyEmail } = useVerifyEmail();
  const { authNumber } = useSubmit();

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('email-storage');
      setEmail('');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [setEmail]);

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
                  [styles['form__input--error']]: verifyEmail.errorMessage,
                  [styles['form__input--normal']]: verifyEmail.isSuccess,
                })}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="email"
              />
              <button
                type="button"
                className={styles['auth-button']}
                onClick={() => verifyEmail.mutate(email)}
                disabled={verifyEmail.isPending}
              >
                {verifyEmail.isSuccess ? '재발송' : '인증번호 발송'}
              </button>
            </div>
            {!verifyEmail.isSuccess && (
            <span className={styles.form__error}>
              {verifyEmail.errorMessage && <ErrorIcon />}
              {verifyEmail.errorMessage}
            </span>
            )}
          </label>
          <label className={styles.form__label} htmlFor="auth-num">
            인증번호 보내기
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: authNumber.errorMessage,
              })}
              type="text"
              id="auth-num"
              onChange={(e) => setVerify(e.target.value)}
            />
            {!authNumber.isSuccess && (
            <span className={styles.form__error}>
              {authNumber.errorMessage && <ErrorIcon />}
              {authNumber.errorMessage}
            </span>
            )}
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              authNumber.submit({ email, verify });
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
