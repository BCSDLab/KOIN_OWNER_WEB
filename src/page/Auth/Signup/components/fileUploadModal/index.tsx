import { createPortal } from 'react-dom';
import styles from './fileUploadModal.module.scss';

interface FileUploadModalProps {
  onClose: () => void;
  onUpload: (files: FileList) => void;
}

export default function FileUploadModal({ onClose, onUpload }: FileUploadModalProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onUpload(event.target.files);
      onClose();
    }
  };

  return createPortal(
    <div className={styles['file-upload-modal']}>
      <div className={styles['file-upload-modal-container']}>
        <div className={styles.title}>
          <span className={styles['title--highlight']}>파일</span>
          을 첨부하세요
        </div>
        <div className={styles['sub-title']}>
          사업자등록증, 영업신고증,
          통장사본 이미지는 필수입니다.
          10mb 이하의 PDF 혹은 이미지 형식의
          파일(e.g. jpg, png, gif 등)로
          5개까지 업로드 가능합니다.
        </div>
        <div className={styles['upload-input-button-container']}>
          <input
            type="file"
            multiple
            className={styles['file-input']}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <button
            type="button"
            className={styles['upload-button--upload']}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            첨부하기
          </button>
          <button
            type="button"
            className={styles['upload-button--cancel']}
            onClick={onClose}
          >
            취소하기
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
