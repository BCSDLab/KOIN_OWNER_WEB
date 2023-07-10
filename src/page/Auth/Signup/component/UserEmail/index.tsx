import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { RegisterData } from 'page/Auth/Signup/types/RegisterData';
import useValidateEmail from 'page/Auth/Signup/hooks/useValidateEmail';
import useAuthCheck from 'page/Auth/Signup/hooks/useAuthCheck';
import useVerification from 'page/Auth/Signup/hooks/useVerification';
import styles from './UserEmail.module.scss';

type ButtonClickEvent = {
  clickEvent?: () => void | null,
  userData: RegisterData,
  setAuthenticate: (data:RegisterData) => void
};

export default function UserEmail({ clickEvent, userData, setAuthenticate }:ButtonClickEvent) {
  const { isMobile } = useMediaQuery();
  const {
    emailHandleSubmit, errors, emailDuplicateRegister, watch,
  } = useValidateEmail();
  const {
    isOpen, onSubmit, errorMessage, email, refetch,
  } = useAuthCheck(userData.email ? userData.email : '', isMobile);
  const {
    verificationCode,
    codeInput, errorMessage: verificateError,
  } = useVerification(email, setAuthenticate, userData);

  return (
    !isMobile
      ? (
        <form className={styles['email-check']} onSubmit={emailHandleSubmit(onSubmit)}>
          <span className={styles['email-check__label']}>이메일 인증</span>
          <div className={styles['email-check__input']}>
            <input className={styles.input} type="text" placeholder="이메일 입력@example.com" {...emailDuplicateRegister} disabled={isOpen} />
            {isOpen && <input className={styles.input} type="text" pattern="\d*" maxLength={6} placeholder="인증번호" ref={codeInput} disabled={userData.isAuthentication} />}
          </div>
          {(errors.email) && (
            <div className={styles['email-check__warn']}>
              <Warn />
              <span className={styles['email-check__warn--phrase']}>{errors.email.message}</span>
            </div>
          )}
          {verificateError && (
          <div className={styles['email-check__warn']}>
            <Warn />
            <span className={styles['email-check__warn--phrase']}>{verificateError}</span>
          </div>
          )}
          {(!errors.email && errorMessage && email === watch().email)
          && (
          <div className={styles['email-check__warn']}>
            <Warn />
            <span className={styles['email-check__warn--phrase']}>{errorMessage}</span>
          </div>
          )}
          {isOpen ? (
            <>
              <span className={styles['email-check__alert']}>* 제한시간 5 : 00</span>

              <CustomButton
                buttonSize="large"
                content="인증완료"
                onClick={verificationCode}
              />
            </>
          ) : (
            <CustomButton
              buttonSize="large"
              content="인증번호발송"
              submit
            />
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
              <input className={styles.input} type="password" pattern="\d*" maxLength={6} placeholder="인증번호 입력" />
            </div>
            {userData.isAuthentication !== undefined && !userData.isAuthentication && (
            <div className={styles['email-check__warn']}>
              <Warn />
              <span className={styles['email-check__warn--phrase']}>인증번호가 일치하지 않습니다.</span>
            </div>
            )}
            <span className={styles['email-check__alert']}>* 제한시간 5 : 00</span>
          </div>
          <div className={styles.buttons}>
            <CustomButton buttonSize="mobile" content="재발송" onClick={refetch} />
            <CustomButton buttonSize="mobile" content="다음" onClick={clickEvent} />
          </div>
        </>
      )
  );
}
