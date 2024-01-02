// 필요한 모듈과 컴포넌트 임포트
import { createPortal } from 'react-dom';
import { useRef } from 'react';
import { ReactComponent as CancleIcon } from 'assets/svg/addmenu/mobile-cancle-icon.svg';
import styles from './AddMenuImgModal.module.scss';

interface AddMenuImgModalProps {
  isOpen: boolean;
  onCancel: (event: React.MouseEvent | React.KeyboardEvent<Element>) => void;
  onImageSelect: (image: string) => void; // 이미지 선택 콜백 함수
}

export default function AddMenuImgModal({ isOpen, onCancel, onImageSelect }: AddMenuImgModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력을 위한 ref

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          onImageSelect(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click(); // 파일 입력 트리거
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.modal}
      onClick={onCancel}
      onKeyDown={onCancel}
      role="button"
      tabIndex={0}
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="presentation"
      >
        <button
          type="button"
          className={styles['cancel-button']}
          onClick={onCancel}
        >
          <CancleIcon className={styles.cancelIcon} />
        </button>
        <span className={styles['content__main-text']}>이미지 추가</span>
        <span className={styles['content__sub-text']}>메뉴 사진을 추가 할 수 있습니다.</span>
        <div className={styles['content__button-container']}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <button
            type="button"
            className={styles['content__album-button']}
            onClick={triggerFileInput}
          >
            사진 앨범
          </button>
          <button
            type="button"
            className={styles['content__camera-button']}
            onClick={onCancel}
          >
            카메라 촬영
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
