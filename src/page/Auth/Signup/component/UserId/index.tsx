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
    !isMobile
      ? (
        <form className={styles.form} onSubmit={emailHandleSubmit(onSubmit)}>
          <span className={styles.form__label}>아이디</span>
          <div className={styles['input-block']}>
            <input
              className={styles['input-block__input']}
              id="id-input"
              type="text"
              placeholder="이메일 형식 아이디 입력(필수)"
              {...emailDuplicateRegister}
            />
            <CustomButton content="중복확인" buttonSize="small" submit />
          </div>
          {errors.email && <span className={styles['form__warn--phrase']}>{errors.email.message}</span>}
          { isUsable !== null
            && (
            <>
              {isUsable && <span className={styles.form__alert}>사용하실 수 있는 아이디 입니다.</span>}
              {!isUsable && <span className={styles['form__warn--phrase']}>이미 가입된 이메일입니다.</span>}
            </>
            )}
        </form>
      )
      : (
        <form className={styles['input-block']} onSubmit={emailHandleSubmit(onSubmit)}>
          <div className={styles['input-block__input-elements']}>
            <input
              className={styles['input-block__input']}
              id="id-input"
              placeholder="이메일"
              type="text"
              {...emailDuplicateRegister}
            />
            <CustomButton content="중복확인" buttonSize="small" submit />
          </div>
          <div className={styles.form__warn}>
            {errors.email && <span className={styles['form__warn--phrase']}>{errors.email.message}</span>}
            { isUsable !== null
            && (
            <>
              {isUsable && <span className={styles.form__alert}>사용하실 수 있는 아이디 입니다.</span>}
              {!isUsable && (
              <>
                <Warn />
                <span className={styles['form__warn--phrase']}>이미 가입된 이메일입니다.</span>
              </>
              )}
            </>
            )}
          </div>
        </form>
      )
  );
}
