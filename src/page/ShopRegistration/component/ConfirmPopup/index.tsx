import styles from './ConfirmPopup.module.scss';

interface ConfirmPopupProps {
  isOpen: boolean;
  onCancel: (event: React.MouseEvent) => void;
}

export default function ConfirmPopup({ isOpen, onCancel }: ConfirmPopupProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <span className={styles['content__top-text']}>가게 정보를 저장하시겠습니까?</span>
        <span className={styles['content__bottom-text']}>&apos;확인&apos;을 누르면 입력하신 내용으로 가게 정보가 등록됩니다.</span>
        <div className={styles.content__buttons}>
          <button
            type="button"
            onClick={onCancel}
            id="confirmPopup"
            className={styles['content__cancel-button']}
          >
            취소
          </button>
          <button
            type="submit"
            className={styles['content__next-button']}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
