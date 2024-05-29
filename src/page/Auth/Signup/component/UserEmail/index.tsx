import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import useValidateEmail from 'page/Auth/Signup/hooks/useValidateEmail';
import useAuthCheck from 'page/Auth/Signup/hooks/useAuthCheck';
import useVerification from 'page/Auth/Signup/hooks/useVerification';
import ErrorMessage from 'component/common/ErrorMessage';
import useRegisterInfo from 'store/registerStore';
import useTimer from 'page/Auth/Signup/hooks/useTimer';
import { useEffect } from 'react';
import { isKoinError } from '@bcsdlab/koin';
import styles from './UserEmail.module.scss';

export default function UserEmail() {
  const { isMobile } = useMediaQuery();
  const { userInfo: userData } = useRegisterInfo();
  const {
    emailHandleSubmit, errors, emailDuplicateRegister, watch,
  } = useValidateEmail();
  const {
    isOpen, onSubmit: emailSubmit, email, refetch, errorMessage, status,
  } = useAuthCheck(userData.email ? userData.email : '', isMobile); // 회원가입 인증번호 전송
  const {
    verificationCode,
    codeInput, errorMessage: verificateError,
  } = useVerification(email); // 사장님 이메일 인증번호 확인
  const { getTime, startTimer, stopTimer } = useTimer(300);
  const reSubmit = async () => {
    const { error, isError } = await refetch();
    if (isError) {
      if (isKoinError(error)) {
        if (error.status === 409) {
          return; // 재발송 요청이 너무 빠르면 시간을 초기화하지 않고 에러를 보여줌
        }
      }
    }
    startTimer();
  };
  useEffect(() => {
    if (userData.isAuthentication) {
      stopTimer();
    }
  }, [stopTimer, userData.isAuthentication, verificateError]);
  useEffect(() => {
    if (status === 'success') {
      startTimer();
    }
  }, [startTimer, status]);
  return (
    !isMobile
      ? (
        <form className={styles['email-check']} onSubmit={emailHandleSubmit(emailSubmit)}>
          <span className={styles['email-check__label']}>이메일 인증</span>
          <div className={styles['email-check__input']}>
            <input className={styles.input} type="text" placeholder="이메일 입력@example.com" {...emailDuplicateRegister} disabled={isOpen} />
            {(errors.email || (errorMessage && watch().email === email)) && (
              <ErrorMessage message={
                [errors.email?.message, errorMessage].filter((msg) => typeof msg === 'string')
              }
              />
            )}
            {isOpen && <input className={styles['input--code']} type="text" pattern="\d*" maxLength={6} placeholder="인증번호" ref={codeInput} disabled={userData.isAuthentication} />}
          </div>
          {isOpen ? (
            <>
              {verificateError ? <ErrorMessage message={verificateError} />
                : <span className={styles['email-check__alert']}>{`* 제한시간 ${getTime()}`}</span>}
              <div className={styles.button}>
                <CustomButton
                  buttonSize="large"
                  content="인증완료"
                  onClick={verificationCode}
                  disable={userData.isAuthentication}
                />
              </div>
            </>
          ) : (
            <div className={styles.button}>
              <CustomButton
                buttonSize="large"
                content="인증번호발송"
                submit
              />
            </div>
          )}
        </form>
      )
      : (
        <>
          <div className={styles['email-check']}>
            <span className={styles['email-check__phrase']}>
              <span className={styles['email-check__phrase--user-email']}>{userData.email}</span>
              &nbsp;으로
              <br />
              발송된 인증번호 6자리를 입력해 주세요
            </span>
            <div className={styles['email-check__input']}>
              <input className={styles.input} type="password" pattern="\d*" maxLength={6} placeholder="인증번호 입력" ref={codeInput} />
            </div>
            {verificateError && <ErrorMessage message={verificateError} />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <span className={styles['email-check__alert']}>{`* 제한시간 ${getTime()}`}</span>
          </div>
          <div className={styles.buttons}>
            <CustomButton buttonSize="mobile" content="재발송" onClick={reSubmit} />
            <CustomButton buttonSize="mobile" content="다음" onClick={verificationCode} disable={(!codeInput.current || codeInput.current.value.length < 6 || getTime() === '0 : 00')} />
          </div>
        </>
      )
  );
}
