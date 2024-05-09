import { createPortal } from 'react-dom';
import { useErrorMessageStore } from 'store/errorMessageStore';
import showToast from 'utils/ts/showToast';
import styles from './ApprovalModal.module.scss';

const PHONE_NUMBER = '010-7724-5536';

export default function ApprovalModal() {
  const { setLoginErrorStatus } = useErrorMessageStore();
  const copyPhone = () => {
    navigator.clipboard.writeText(PHONE_NUMBER).then(() => {
      showToast('success', '전화번호를 클립보드에 복사하였습니다.');
    }).catch(() => {
      showToast('error', '전화번호를 복사하는데 실패했습니다.');
    });
  };

  return createPortal(
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.container__title}>
          <span>관리자의 승인</span>
          이 진행 중입니다.
        </div>
        <div className={styles.container__description}>
          <span>해당 화면이 지속해서 보일 시</span>
          <span>아래 연락처로 문의하시기 바랍니다.</span>
        </div>
        <div className={styles.container__phone}>{PHONE_NUMBER}</div>
        <div className={styles.button}>
          <button
            type="button"
            className={styles.button__confirm}
            onClick={() => setLoginErrorStatus(0)}
          >
            확인
          </button>
          <button
            type="button"
            className={styles.button__clipboard}
            onClick={() => {
              copyPhone();
              setLoginErrorStatus(0);
            }}
          >
            번호 복사
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
