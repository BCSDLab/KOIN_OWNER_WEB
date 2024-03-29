import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import useValidateEmail from 'page/Auth/Signup/hooks/useValidateEmail';
import useAuthCheck from 'page/Auth/Signup/hooks/useAuthCheck';
import useVerification from 'page/Auth/Signup/hooks/useVerification';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import useRegisterInfo from 'store/registerStore';
import useTimer from 'page/Auth/Signup/hooks/useTimer';
import { useEffect } from 'react';
import styles from './UserEmail.module.scss';

export default function UserEmail() {
  const { isMobile } = useMediaQuery();
  const { userInfo: userData } = useRegisterInfo();
  const {
    emailHandleSubmit, errors, emailDuplicateRegister, watch,
  } = useValidateEmail();
  const {
    isOpen, onSubmit: emailSubmit, email, refetch, errorMessage,
  } = useAuthCheck(userData.email ? userData.email : '', isMobile);
  const {
    verificationCode,
    codeInput, errorMessage: verificateError, status,
  } = useVerification(email);
  const { getTime, startTimer, stopTimer } = useTimer(300);
  const reSubmit = () => {
    startTimer();
    refetch();
  };
  useEffect(() => {
    if (userData.isAuthentication) {
      stopTimer();
    }
  }, [stopTimer, userData.isAuthentication]);
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
            { (errors.email || (errorMessage && watch().email === email)) && (
            <ErrorMessage message={
              [errors.email?.message, errorMessage].filter((msg) => typeof msg === 'string')
            }
            />
            )}
            {isOpen && <input className={styles['input--code']} type="text" pattern="\d*" maxLength={6} placeholder="인증번호" ref={codeInput} disabled={userData.isAuthentication} />}
          </div>
          {isOpen ? (
            <>
              { verificateError ? <ErrorMessage message={[verificateError]} />
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
            {verificateError && <ErrorMessage message={[verificateError]} />}
            <span className={styles['email-check__alert']}>{`* 제한시간 ${getTime()}`}</span>
          </div>
          <div className={styles.buttons}>
            <CustomButton buttonSize="mobile" content="재발송" onClick={reSubmit} />
            <CustomButton buttonSize="mobile" content="다음" onClick={verificationCode} disable={(!codeInput.current || codeInput.current.value.length < 6)} />
          </div>
        </>
      )
  );
}
