import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler } from 'react-hook-form';
import useEmailDuplicateCheck from 'page/Auth/Signup/hooks/useEmailDataCheck';
import { useState } from 'react';
import { RegisterData } from 'page/Auth/Signup/types/RegisterData';
import styles from './UserId.module.scss';

interface EmailInputProps {
  setId: (data:RegisterData) => void,
  userData?: RegisterData
}

export default function UserId({ setId, userData }:EmailInputProps) {
  const { isMobile } = useMediaQuery();
  const [isUsable, setUsable] = useState<boolean | null>(null);
  const { emailHandleSubmit, errors, emailDuplicateRegister } = useEmailDuplicateCheck();
  const onSubmit:SubmitHandler<RegisterData> = (data) => {
    console.log('이메일 중복 체크', data.email);
    setId({ ...userData, email: data.email });
    setUsable(!isUsable);
  };
  const mobileSubmit:SubmitHandler<RegisterData> = (data) => {
    if (isMobile) {
      console.log('이메일 중복 체크', data.email);
      setId({ ...userData, email: data.email });
      setUsable(!isUsable);
    }
  };
  return (
    <form
      className={styles.form}
      onChange={emailHandleSubmit(mobileSubmit)}
      onSubmit={emailHandleSubmit(onSubmit)}
    >
      {!isMobile && <span className={styles.form__label}>아이디</span>}
      <div className={styles['input-block']}>
        <input
          className={styles['input-block__input']}
          id="id-input"
          type="text"
          placeholder={isMobile ? '이메일' : '이메일 형식 아이디 입력(필수)'}
          {...emailDuplicateRegister}
        />
        <CustomButton content="중복확인" buttonSize="small" submit />
      </div>
      {errors.email && (
      <div className={styles.form__warn}>
        <Warn />
        <span className={styles['form__warn--phrase']}>{errors.email.message}</span>
      </div>
      )}
      { (isUsable !== null && !errors.email)
            && (
            <>
              {isUsable && <span className={styles.form__alert}>사용하실 수 있는 아이디 입니다.</span>}
              {!isUsable && (
              <div className={styles.form__warn}>
                <Warn />
                <span className={styles['form__warn--phrase']}>이미 가입된 이메일입니다.</span>
              </div>
              )}
            </>
            )}
    </form>
  );
}
