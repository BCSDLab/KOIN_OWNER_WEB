import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import useValidateEmail from 'page/Auth/Signup/hooks/useValidateEmail';
import { RegisterData } from 'page/Auth/Signup/types/RegisterData';
import useCheckEmailDuplicate from 'page/Auth/Signup/hooks/useCheckEmailDuplicate';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import styles from './UserId.module.scss';

interface EmailInputProps {
  setId: (data:RegisterData) => void,
  userData: RegisterData
}

export default function UserId({ setId, userData }:EmailInputProps) {
  const { isMobile } = useMediaQuery();
  const {
    emailHandleSubmit, errors: formErros, emailDuplicateRegister, watch,
  } = useValidateEmail();
  const {
    status, onSubmit, onMobileSubmit, email, errorMessage: requestError,
  } = useCheckEmailDuplicate(userData, setId, isMobile);

  return (
    <form
      className={styles.form}
      onChange={isMobile ? emailHandleSubmit(onMobileSubmit) : () => {}}
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
        {!isMobile && <CustomButton content="중복확인" buttonSize="small" submit />}
      </div>
      {formErros.email && <ErrorMessage message={formErros.email.message} />}
      {!formErros.email && watch().email === email && requestError
      && <ErrorMessage message={requestError} />}
      {!formErros.email && watch().email === email && status === 'success'
      && <span className={styles.form__alert}>사용하실 수 있는 아이디 입니다.</span>}
    </form>
  );
}
