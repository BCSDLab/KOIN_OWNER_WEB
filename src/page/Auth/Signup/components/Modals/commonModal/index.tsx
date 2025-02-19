import { createPortal } from 'react-dom';
import styles from './index.module.scss';

interface Props {
  title: string;
  onClose: () => void;
  buttonLabel: string;
}

type CommomnProps = Partial<Props>;

export default function CommonModal({ title, buttonLabel, onClose }: CommomnProps) {
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
