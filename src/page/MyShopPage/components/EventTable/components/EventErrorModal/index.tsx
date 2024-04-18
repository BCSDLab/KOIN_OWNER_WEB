import styles from './EventErrorModal.module.scss';

interface EventErrorModalProps {
  content : string
  setIsOpen : (isOpen: boolean) => void
  setSelectAll : (selectAll: boolean) => void
}
export default function EventErrorModal({
  content, setIsOpen,
  setSelectAll,
}: EventErrorModalProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.content}>{content}</div>
        <div
          className={styles['check-button']}
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsOpen(false);
            setSelectAll(false);
          }}
          onKeyDown={handleKeyDown}
        >
          확인
        </div>
      </div>
    </div>
  );
}
