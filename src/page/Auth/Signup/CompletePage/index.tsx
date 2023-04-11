import { ReactComponent as Check } from '../../../../assets/svg/auth/check.svg';
import styles from './Complete.module.scss';

export default function Complete() {
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.check_circle}><Check /></div>
      <span className={styles.complete}>가입 신청 완료</span>
      <div className={styles.complete_text}>
        <span>
          가입 신청이 완료되었습니다.
        </span>
        <span>
          가입 허가가 승인되면 로그인이 가능합니다.
        </span>
      </div>
      <div className={styles.link_button}>로그인 화면 바로가기</div>
    </div>
  );
}
