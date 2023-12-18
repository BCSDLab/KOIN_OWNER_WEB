import { ReactComponent as Check } from 'assets/svg/auth/check.svg';
import { useNavigate } from 'react-router-dom';
import useRouteCheck from 'page/Auth/FindPassword/hooks/useRouteCheck';
import styles from './CompleteChangePassword.module.scss';

export default function CompleteChangePassword() {
  const navigate = useNavigate();
  useRouteCheck('nextStep', '/new-password');
  return (
    <div className={styles.template}>
      <div className={styles['circle-icon']}>
        <Check />
      </div>
      <div className={styles.content}>
        <div className={styles.content__title}>비밀번호 변경 완료</div>
        <div className={styles.content__description}>
          비밀번호가 변경되었습니다.
          <br />
          새로운 비밀번호로 로그인 부탁드립니다.
        </div>
        <button type="button" className={styles.content__button} onClick={() => navigate('/login')}>로그인 화면 바로가기</button>
      </div>
    </div>
  );
}
