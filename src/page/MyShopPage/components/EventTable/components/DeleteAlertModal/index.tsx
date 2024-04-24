import styles from './DeleteAlertModal.module.scss';

interface DeleteAlertModalProps {
  title: React.ReactNode;
  content: string
  setIsOpen: (isOpen: boolean) => void
}

export default function DeleteAlertModal({ title, content, setIsOpen }: DeleteAlertModalProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(false);
    }
  };
  return (
    <div className={styles['delete-alert-modal-container']}>
      <div className={styles['delete-alert-modal']}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles['delete-alert-button-container']}>
          <div
            className={styles['delete-alert-button--cancel']}
            role="button"
            tabIndex={0}
            onClick={() => {
              setIsOpen(false);
            }}
            onKeyDown={handleKeyDown}
          >
            취소
          </div>
          <div
            className={styles['delete-alert-button--check']}
            role="button"
            tabIndex={0}
            onClick={() => {
              setIsOpen(false);
            }}
            onKeyDown={handleKeyDown}
          >
            삭제
          </div>
        </div>
      </div>
    </div>
  );
}
