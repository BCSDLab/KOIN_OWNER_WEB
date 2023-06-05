import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import styles from './UserEmail.module.scss';

type ButtonClickEvent = {
  clickEvent?: () => void | null
};
export default function UserEmail({ clickEvent }:ButtonClickEvent) {
  const { isMobile } = useMediaQuery();
  return (
    !isMobile
      ? (
        <div className={styles['email-check']}>
          <span className={styles['email-check__label']}>이메일 인증</span>
          <div className={styles['email-check__input']}>
            <input className={styles.input} type="text" placeholder="이메일 입력@example.com" />
            <input className={styles.input} type="text" placeholder="인증번호" />
          </div>
          <span className={styles['email-check__alert']}>* 제한시간 5 : 00</span>
          <CustomButton buttonSize="large" content="인증번호 발송" />
        </div>
      )
      : (
        <>
          <div className={styles['email-check']}>
            <span className={styles['email-check__phrase']}>
              <span className={styles['email-check__phrase--user-email']}>abcd123@koreatech.ac.kr</span>
            &nbsp;으로
              <br />
              발송된 인증번호 6자리를 입력해 주세요
            </span>
            <div className={styles['email-check__input']}>
              <input className={styles.input} type="password" placeholder="인증번호 입력" />
            </div>
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
