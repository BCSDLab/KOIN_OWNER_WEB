import { createPortal } from 'react-dom';
import useStepStore from 'store/useStepStore';
import styles from './ConfirmPopup.module.scss';

interface ConfirmPopupProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ConfirmPopup({ isOpen, onClose }: ConfirmPopupProps) {
  const { step, setStep } = useStepStore();

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.content}>
        <span className={styles['content__top-text']}>가게 정보를 저장하시겠습니까?</span>
        <span className={styles['content__bottom-text']}>&apos;확인&apos;을 누르면 입력하신 내용으로 가게 정보가 등록됩니다.</span>
        <div className={styles.content__buttons}>
          <button
            type="button"
            onClick={onClose}
            id="confirmPopup"
            className={styles['content__cancel-button']}
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className={styles['content__next-button']}
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
