import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import styles from './UserEmail.module.scss';

export default function UserEmail() {
  const { isMobile } = useMediaQuery();
  return (
    !isMobile
      ? (
        <div className={styles['email-check']}>
          <span className={styles['email-check__label']}>이메일 인증</span>
          <div className={styles['email-check__input--wrapper']}>
            <input className={styles['email-check__input']} type="text" placeholder="이메일 입력@example.com" />
            <input className={styles['email-check__input']} type="text" placeholder="인증번호" />
          </div>
          <span className={styles['email-check__alert']}>* 제한시간 5 : 00</span>
          <CustomButton type="large" content="인증번호 발송" />
        </div>
      )
      : (
        <div className={styles['email-check']}>
          <span className={styles['email-check__phrase']}>
            <span className={styles['email-check__phrase--user-email']}>abcd123@koreatech.ac.kr</span>
            &nbsp;으로
            <br />
            발송된 인증번호 6자리를 입력해 주세요
          </span>
          <div className={styles['email-check__input--wrapper']}>
            <input className={styles['email-check__input']} type="password" placeholder="인증번호 입력" />
          </div>
          <span className={styles['email-check__alert']}>* 제한시간 5 : 00</span>
        </div>
      )
  );
}
