import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { ReactComponent as FileIcon } from 'assets/svg/auth/file-icon.svg';
import FileUploadModal from 'page/Auth/Signup/components/fileUploadModal';
import useUploadFile from 'query/upload';
import SearchShop from 'page/Auth/Signup/components/searchShop';
// import { File } from 'model/File';
import { isKoinError, sendClientError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import styles from './ownerInfoStep.module.scss';

interface OwnerInfo {
  ownerName: string;
  shopName: string;
  shopId: string | null;
  companyRegistrationNumber: string;
  verificationFiles: string[];
}

export default function OwnerInfoStep() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<OwnerInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchShopOpen, setIsSearchShopOpen] = useState(false);
  const { uploadFiles } = useUploadFile();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openSearchShopModal = () => setIsSearchShopOpen(true);
  const closeSearchShopModal = () => setIsSearchShopOpen(false);

  const handleUpload = async (files: FileList) => {
    const formData = new FormData();

    Array.from(files).map((file) => formData.append('files', file));
    try {
      const response = await uploadFiles(formData);
      const { file_urls: fileUrls } = response.data;
      setUploadedFiles((prev) => [...prev, ...fileUrls]);
      setValue('verificationFiles', [...uploadedFiles, ...fileUrls]);
    } catch (error) {
      if (isKoinError(error)) {
        showToast('error', error.message);
      }
      sendClientError(error);
    }
  };

  const handleShopSelect = (name: string, id: string) => {
    setValue('shopName', name);
    setValue('shopId', id);
    closeSearchShopModal();
  };

  return (
    <div className={styles['owner-info-container']}>
      <div className={styles['owner-name']}>
        <span className="owner-name__label">대표자명(실명)</span>
        <input
          {...register('ownerName', {
            required: {
              value: true,
              message: '이름을 입력해주세요',
            },
            pattern: {
              value: /^[가-힣a-zA-Z\s]+$/,
              message: '유효한 이름을 입력해주세요',
            },
          })}
          placeholder="이름을 입력해주세요."
        />
        {errors.ownerName && <span className={styles['error-message']}>{errors.ownerName.message}</span>}
      </div>
      <div className={styles['shop-name']}>
        <span className="shop-name__label">가게명</span>
        <div className={styles['shop-search-box']}>
          <input
            {...register('shopName', {
              required: {
                value: true,
                message: '가게명을 입력해주세요',
              },
              pattern: {
                value: /^[가-힣a-zA-Z\s]+$/,
                message: '유효한 가게명을 입력해주세요',
              },
            })}
            placeholder="가게명을 입력해주세요."
          />
          <button
            type="button"
            className={styles['search-button']}
            onClick={openSearchShopModal}
          >
            가게 검색
          </button>
        </div>
        {errors.shopName && <span className={styles['error-message']}>{errors.shopName.message}</span>}
      </div>
      <div className={styles['company-registration-number']}>
        <span className="company-registration-number__label">사업자 등록번호</span>
        <input
          {...register('companyRegistrationNumber', {
            required: {
              value: true,
              message: '사업자 등록번호를 입력해주세요.',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: '숫자만 입력해주세요',
            },
          })}
          placeholder="숫자만 입력해주세요."
        />
        {errors.companyRegistrationNumber && <span className={styles['error-message']}>{errors.companyRegistrationNumber.message}</span>}
      </div>
      <div className={styles['document-input']}>
        <span className="document-input__label">사업자 인증 파일</span>
        <div className={styles['document-input__condition']}>
          <span>사업자 등록증, 영업신고증, 통장사본을 첨부하세요.</span>
          <div className={styles['document-count']}>
            {uploadedFiles.length}
            {' '}
            / 5
          </div>
        </div>
        <button
          type="button"
          className={styles['owner-file-input__button']}
          onClick={openModal}
        >
          <FileIcon />
          <span>파일 첨부</span>
        </button>
        {errors.verificationFiles && <span className={styles['error-message']}>{errors.verificationFiles.message}</span>}
      </div>
      {isModalOpen && <FileUploadModal onClose={closeModal} onUpload={handleUpload} />}
      {isSearchShopOpen && (
        <SearchShop onClose={closeSearchShopModal} onSelect={handleShopSelect} />
      )}
      <div className={styles['file-list']}>
        {uploadedFiles.map((file) => (
          <div key={file}>
            {file}
          </div>
        ))}
      </div>
    </div>
  );
}
