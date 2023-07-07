import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler } from 'react-hook-form';
import { RegisterData } from 'page/Auth/Signup/types/RegisterData';
import useEmailDuplicateCheck from 'page/Auth/Signup/hooks/useEmailDataCheck';
import useAuthCheck from 'page/Auth/Signup/hooks/useAuthCheck';
import styles from './UserEmail.module.scss';

type ButtonClickEvent = {
  clickEvent?: () => void | null,
  userData: RegisterData,
  setAuthenticate: (data:RegisterData) => void
};
export default function UserEmail({ clickEvent, userData, setAuthenticate }:ButtonClickEvent) {
  const { isMobile } = useMediaQuery();
  const [isOpen, setOpen] = useState(false);
  const { emailHandleSubmit, errors, emailDuplicateRegister } = useEmailDuplicateCheck();
  const { authInput, checkAuthNumber } = useAuthCheck();
  const onSubmit:SubmitHandler<RegisterData> = (data) => {
    setOpen(true);
    console.log(data.email);
  };
  const compareAuthNumber = () => {
    if (authInput.current?.value.length === 6) {
      // 인증 번호 입력
      if (checkAuthNumber('123456')) {
        setAuthenticate({ ...userData, isAuthentication: true });
      } else {
        setAuthenticate({ ...userData, isAuthentication: false });
      }
    }
  };
  return (
    !isMobile
      ? (
        <form className={styles['email-check']} onSubmit={emailHandleSubmit(onSubmit)}>
          <span className={styles['email-check__label']}>이메일 인증</span>
          <div className={styles['email-check__input']}>
            <input className={styles.input} type="text" placeholder="이메일 입력@example.com" {...emailDuplicateRegister} />
            {isOpen && <input className={styles.input} type="text" pattern="\d*" maxLength={6} placeholder="인증번호" ref={authInput} />}
          </div>
          {errors.email && (
            <div className={styles['email-check__warn']}>
              <Warn />
              <span className={styles['email-check__warn--phrase']}>{errors.email.message}</span>
            </div>
          )}
          {isOpen ? (
            <>
              <span className={styles['email-check__alert']}>* 제한시간 5 : 00</span>
              <CustomButton
                buttonSize="large"
                content="인증완료"
                onClick={compareAuthNumber}
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
              <input className={styles.input} type="password" pattern="\d*" maxLength={6} placeholder="인증번호 입력" onChange={compareAuthNumber} ref={authInput} />
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
            <CustomButton buttonSize="mobile" content="재발송" onClick={() => { alert('재발송'); }} />
            <CustomButton buttonSize="mobile" content="다음" onClick={clickEvent} />
          </div>
        </>
      )
  );
}
