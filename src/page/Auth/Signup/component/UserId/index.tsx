import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './UserId.module.scss';

const REG_EX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
type FormData = {
  email:string
};

const useEmailDuplicateCheck = () => {
  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const emailDuplicateRegister = emailRegister('email', {
    required: { value: true, message: '이메일을 입력해주세요.' },
    pattern: {
      value: REG_EX,
      message: '유효한 이메일 주소를 입력해주세요.',
    },
  });
  return {
    emailHandleSubmit, errors, emailDuplicateRegister,
  };
};

export default function UserId() {
  const { isMobile } = useMediaQuery();
  const [isUsable, setUsable] = useState<boolean | null>(null);
  const { emailHandleSubmit, errors, emailDuplicateRegister } = useEmailDuplicateCheck();
  const onSubmit:SubmitHandler<FormData> = (data) => {
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
              className={styles[`${(isUsable !== null) ? 'input-block__input' : 'input-block__input--warn'}`]}
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
