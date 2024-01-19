import { ReactComponent as Error } from 'assets/svg/error/WIP-error.svg';
import { useNavigate } from 'react-router-dom';
import styles from './WorkInProcess.module.scss';

export default function WorkInProcess() {
  const navigate = useNavigate();

  return (
    <div className={styles.template}>
      <div className={styles['error-icon']}>
        <Error />
      </div>
      <div className={styles.content}>
        <div className={styles.content__title}>Page Not Found</div>
        <div className={styles.content__description}>
          죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.
          <br />
          주소가 잘못 입력되었거나, 개발 중인 페이지일 수 있습니다.
        </div>
        <button
          type="button"
          className={styles.content__button}
          onClick={() => navigate('/')}
        >
          메인 화면 바로가기
        </button>
      </div>
    </div>
  );
}
