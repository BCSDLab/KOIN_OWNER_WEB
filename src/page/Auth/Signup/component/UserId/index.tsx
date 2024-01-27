import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import useValidateEmail from 'page/Auth/Signup/hooks/useValidateEmail';
import useCheckEmailDuplicate from 'page/Auth/Signup/hooks/useCheckEmailDuplicate';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import styles from './UserId.module.scss';

export default function UserId() {
  const { isMobile } = useMediaQuery();
  const {
    emailHandleSubmit, errors: formErros, emailDuplicateRegister, watch,
  } = useValidateEmail();
  const {
    status, onSubmit, email, errorMessage,
  } = useCheckEmailDuplicate(isMobile);

  return (
    <form
      className={styles.form}
      onChange={isMobile ? emailHandleSubmit(onSubmit) : () => {}}
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
      {formErros.email ? <ErrorMessage message={[formErros.email.message]} />
        : (
          <>
            {(watch().email === email && status === 'error') && <ErrorMessage message={[errorMessage]} />}
            {(watch().email === email && status === 'success') && <span className={styles.form__alert}>사용하실 수 있는 아이디 입니다.</span>}
          </>
        )}
    </form>
  );
}
