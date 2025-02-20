import { createPortal } from 'react-dom';
import styles from './index.module.scss';

interface Props {
  title: string;
  onClose: () => void;
  buttonLabel: string;
  onConfirm: () => void;
}

type CommomnProps = Partial<Props>;

export function ConfirmModal({
  title, onClose, buttonLabel, onConfirm,
}: CommomnProps) {
  return (
    <div className={styles.overay}>
      <div className={styles.modal}>
        <div className={styles.title}>
          선택
          {' '}
          {title}
          {' '}
          을(를)
          <br />
          <span className={styles.title__name}>삭제</span>
          하시겠어요?
        </div>
        <div className={styles.button__container}>
          <button
            type="button"
            onClick={onClose}
            className={styles.button__common}
          >
            {buttonLabel || '취소'}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={styles.button__confirm}
          >
            {buttonLabel || '삭제하기'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CommonModal({ title, buttonLabel, onClose }: CommomnProps) {
  return createPortal(
    <div className={styles.overay}>
      <div className={styles.modal}>
        <div className={styles.title}>
          {title}
        </div>
        <button
          type="button"
          onClick={onClose}
          className={styles.button}
        >
          {buttonLabel || '확인'}
        </button>
      </div>
    </div>,
    document.body,
  );
}
