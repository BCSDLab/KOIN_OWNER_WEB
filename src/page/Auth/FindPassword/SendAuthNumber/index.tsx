import { Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as KoinLogo } from 'assets/svg/auth/koin-logo.svg';
import { useState } from 'react';
import cn from 'utils/ts/className';
import { useMutation } from '@tanstack/react-query';
import { findPassword, findPasswordVerify } from 'api/auth';
import styles from './SendAuthNumber.module.scss';

export default function FindPassword() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [verifyInput, setVerifyInput] = useState('');
  const [isSendAuth, setIsSendAuth] = useState(false);
  const verifyEmail = useMutation({
    mutationFn: () => findPasswordVerify({ address: emailInput }),
    onSuccess: () => {
      setIsSendAuth(true);
    },
  });

  const submit = useMutation({
    mutationFn: () => findPassword({ address: emailInput, certificationCode: verifyInput }),
    onSuccess: () => {
      navigate('/new-password');
    },
    onError: () => {
      // TODO: 이메일 인증 실패 시 UI 처리 필요
    },
  });

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
              <button type="button" className={styles['auth-button']} onClick={() => verifyEmail.mutate()} disabled={verifyEmail.isLoading}>
                {isSendAuth ? '재발송' : '인증번호 발송'}
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
              submit.mutate();
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
