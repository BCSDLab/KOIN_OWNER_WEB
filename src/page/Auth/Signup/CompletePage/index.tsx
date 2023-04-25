import { ReactComponent as Check } from '../../../../assets/svg/auth/check.svg';
import styles from './Complete.module.scss';

export default function Complete() {
  return (
    <div className={styles['content-wrapper']}>
      <div className={styles['complete-circle']}><Check className={styles['complete-circle--check-image']} /></div>
      <span className={styles.complete}>가입 신청 완료</span>
      <div className={styles['complete-text']}>
        <span>
          가입 신청이 완료되었습니다.
        </span>
        <span>
          가입 허가가 승인되면 로그인이 가능합니다.
        </span>
      </div>
      <div className={styles['link-button']}>로그인 화면 바로가기</div>
    </div>
  );
}
