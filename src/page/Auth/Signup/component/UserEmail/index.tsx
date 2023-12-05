import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { User } from 'page/Auth/Signup/types/User';
import useValidateEmail from 'page/Auth/Signup/hooks/useValidateEmail';
import useAuthCheck from 'page/Auth/Signup/hooks/useAuthCheck';
import useVerification from 'page/Auth/Signup/hooks/useVerification';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import styles from './UserEmail.module.scss';

type ButtonClickEvent = {
  goNext?: () => void;
  userData:User,
  setAuthenticate: (data:User) => void
};

export default function UserEmail({ userData, setAuthenticate }:ButtonClickEvent) {
  const { isMobile } = useMediaQuery();
  const {
    emailHandleSubmit, errors: formErrors, emailDuplicateRegister, watch,
  } = useValidateEmail();
  const {
    isOpen, onSubmit, errorMessage: requestError, email, refetch,
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
          { formErrors.email && <ErrorMessage message={formErrors.email.message} />}
          {(!formErrors.email && requestError && email === watch().email)
           && <ErrorMessage message={requestError} />}
          { verificateError && <ErrorMessage message={verificateError} />}
          {isOpen ? (
            <>
              <span className={styles['email-check__alert']}>* 제한시간 5 : 00</span>
              <CustomButton
                buttonSize="large"
                content="인증완료"
                onClick={verificationCode}
                disable={userData.isAuthentication}
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
              <input className={styles.input} type="password" pattern="\d*" maxLength={6} placeholder="인증번호 입력" ref={codeInput} />
            </div>
            {verificateError && <ErrorMessage message={verificateError} />}
            <span className={styles['email-check__alert']}>* 제한시간 5 : 00</span>
          </div>
          <div className={styles.buttons}>
            <CustomButton buttonSize="mobile" content="재발송" onClick={refetch} />
            <CustomButton buttonSize="mobile" content="다음" onClick={verificationCode} />
          </div>
        </>
      )
  );
}
