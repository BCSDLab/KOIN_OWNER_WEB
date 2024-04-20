import { Link } from 'react-router-dom';
import { ReactComponent as Check } from 'assets/svg/auth/check.svg';
import useStepStore from 'store/useStepStore';
import styles from './Complete.module.scss';

export default function Complete() {
  const { setStep } = useStepStore();

  const initialize = () => {
    setStep(0); // 회원가입을 진행하면서 전역으로 사용하는 step이 증가하고 있음, 따라서 step을 초기화해야 가게 정보 입력 시 처음 스텝부터 시작
  };

  return (
    <div className={styles.content}>
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
      <Link to="/login" className={styles['link-button']} onClick={initialize}>로그인 화면 바로가기</Link>
    </div>
  );
}
