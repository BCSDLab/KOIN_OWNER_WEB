import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import FileIcon from 'assets/svg/auth/file-icon.svg?react';
import DeleteFile from 'assets/svg/auth/delete-file.svg?react';
import FileUploadModal from 'page/Auth/Signup/components/fileUploadModal';
import useUploadFile from 'query/upload';
import { isKoinError, sendClientError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import { toast } from 'react-toastify';
import styles from './ownerInfoStep.module.scss';

interface OwnerInfo {
  name: string;
  shop_name: string;
  shop_id: number | null;
  company_number: string;
  attachment_urls: { file_url: string }[];
}

export default function UploadStep() {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<OwnerInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { uploadFiles } = useUploadFile();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ file_url: string }[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUpload = async (files: FileList) => {
    const formData = new FormData();
    const names = Array.from(files).map((file) => file.name);

    Array.from(files).forEach((file) => formData.append('files', file));
    try {
      const response = await uploadFiles(formData);
      const { file_urls: fileUrls } = response.data;
      const formattedUrls = fileUrls.map((url: string) => ({ file_url: url }));
      if (formattedUrls.length + uploadedFiles.length > 5) {
        toast.error('파일은 최대 5개 등록할 수 있습니다');
        return;
      }
      setUploadedFiles((prev) => [...prev, ...formattedUrls]);
      setFileNames((prev) => [...prev, ...names]);
      setValue('attachment_urls', [...uploadedFiles, ...formattedUrls]);
    } catch (error) {
      if (isKoinError(error)) {
        showToast('error', error.message);
      }
      sendClientError(error);
    }
  };

  const handleDeleteFile = (index: number) => {
    const newUploadedFiles = [...uploadedFiles];
    const newFileNames = [...fileNames];
    newUploadedFiles.splice(index, 1);
    newFileNames.splice(index, 1);
    setUploadedFiles(newUploadedFiles);
    setFileNames(newFileNames);
    setValue('attachment_urls', newUploadedFiles);
  };

  return (
    <div className={styles['owner-info-container']}>
      <div className={styles['document-input']}>
        <span className="document-input__label">사업자 인증 파일</span>
        <div className={styles['document-input__condition']}>
          <span>사업자 등록증, 영업신고증, 통장사본을 첨부하세요.</span>
          <div className={styles['document-count']}>
            {fileNames.length}
            {' '}
            / 5
          </div>
        </div>
        {fileNames.length > 0 && (
        <div className={styles['file-list']}>
          {fileNames.map((name, index) => (
            <div className={styles['file-card']} key={name}>
              <button
                type="button"
                className={styles['delete-button']}
                onClick={() => handleDeleteFile(index)}
              >
                <DeleteFile />
              </button>
              <div className={styles['file-name']}>
                {name}
              </div>
            </div>
          ))}
        </div>
        )}
        <button
          type="button"
          className={styles['owner-file-input__button']}
          onClick={openModal}
        >
          <FileIcon />
          <div>파일 첨부</div>
        </button>
        {errors.attachment_urls && <span className={styles['error-message']}>{errors.attachment_urls.message}</span>}
      </div>
      {isModalOpen && <FileUploadModal onClose={closeModal} onUpload={handleUpload} />}
    </div>
  );
}
