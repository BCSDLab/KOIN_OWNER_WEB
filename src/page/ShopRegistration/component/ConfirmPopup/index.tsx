import ErrorMessage from 'page/Auth/Signup/ErrorMessage';
import { FieldErrors } from 'react-hook-form';
import { useState } from 'react';
import styles from './ConfirmPopup.module.scss';

interface ConfirmPopupProps {
  isOpen: boolean;
  onCancel: (event: React.MouseEvent) => void;
  errors: FieldErrors;
}

export default function ConfirmPopup({ isOpen, onCancel, errors }: ConfirmPopupProps) {
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const errorMessage = Object.keys(errors).map((key) => errors[key]?.message);

  const handleConfirmPopupClose = (event: React.MouseEvent) => {
    setIsConfirmClicked(false);
    onCancel(event);
  };
  if (!isOpen) return null;
  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <span className={styles['content__top-text']}>가게 정보를 저장하시겠습니까?</span>
        <span className={styles['content__bottom-text']}>&apos;확인&apos;을 누르면 입력하신 내용으로 가게 정보가 등록됩니다.</span>
        <div className={styles.content__buttons}>
          <button
            type="button"
            onClick={handleConfirmPopupClose}
            id="confirmPopup"
            className={styles['content__cancel-button']}
          >
            취소
          </button>
          <button
            type="submit"
            className={styles['content__next-button']}
            onClick={() => setIsConfirmClicked(true)}
          >
            확인
          </button>
        </div>
        {errorMessage.length > 0 && isConfirmClicked && <ErrorMessage message="등록에 실패했습니다. 입력한 정보를 다시 확인해주세요." />}
      </div>
    </div>
  );
}
