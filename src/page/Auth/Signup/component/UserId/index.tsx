import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler } from 'react-hook-form';
import useEmailDuplicateCheck from 'page/Auth/Signup/hooks/useEmailDataCheck';
import styles from './UserId.module.scss';

type EmailForm = {
  email:string
};

export default function UserId() {
  const { isMobile } = useMediaQuery();
  const [isUsable, setUsable] = useState<boolean | null>(null);
  const { emailHandleSubmit, errors, emailDuplicateRegister } = useEmailDuplicateCheck();
  const onSubmit:SubmitHandler<EmailForm> = (data) => {
    console.log('이메일 중복 체크', data);
    setUsable(!isUsable);
  };
  return (
    <form className={styles.form} onSubmit={emailHandleSubmit(onSubmit)}>
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
