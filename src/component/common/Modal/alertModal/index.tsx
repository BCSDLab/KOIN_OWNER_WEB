import useLogger from 'utils/hooks/useLogger';
import styles from './alertModal.module.scss';

interface AlertModalProps {
  title: React.ReactNode;
  content: string
  setIsOpen: (isOpen: boolean) => void
  cancelText : string
  acceptText : string
  callBack? : () => void
}

export default function AlertModal({
  title, content, setIsOpen, callBack, cancelText, acceptText,
}: AlertModalProps) {
  const logger = useLogger();
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={styles['alert-modal-container']}
      role="button"
      tabIndex={0}
      onClick={() => {
        setIsOpen(false);
      }}
      onKeyDown={handleKeyDown}
    >
      <div className={styles['alert-modal']}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles['alert-button-container']}>
          <div
            className={styles['alert-button--cancel']}
            role="button"
            tabIndex={0}
            onClick={() => {
              setIsOpen(false);
            }}
            onKeyDown={handleKeyDown}
          >
            {cancelText}
          </div>
          <div
            className={styles['alert-button--check']}
            role="button"
            tabIndex={0}
            onClick={() => {
              setIsOpen(false);
              if (callBack) {
                callBack();
              }
              logger.actionEventClick({ actionTitle: 'OWNER', title: 'add_event_cancel', value: '이벤트 추가 취소' });
            }}
            onKeyDown={handleKeyDown}
          >
            {acceptText}
          </div>
        </div>
      </div>
    </div>
  );
}
