import { useFormContext } from 'react-hook-form';
import { useState, useEffect, ChangeEvent } from 'react';
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

interface OwnerInfoStepProps {
  onSearch: () => void;
  setIsStepComplete: (state: boolean) => void;
}

export default function OwnerInfoStep({ onSearch, setIsStepComplete }: OwnerInfoStepProps) {
  const {
    register,
    watch,
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

  const formatCompanyNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,5})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return value;
  };

  const handleCompanyNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, '');
    if (cleanedValue.length <= 10) {
      const formattedValue = formatCompanyNumber(cleanedValue);
      setValue('company_number', formattedValue);
    }
    if (cleanedValue.length > 10) {
      e.target.value = cleanedValue.slice(0, 10);
      const formattedValue = formatCompanyNumber(e.target.value);
      setValue('company_number', formattedValue);
    }
  };

  const watchedValues = watch(['name', 'shop_name', 'company_number', 'attachment_urls']);

  useEffect(() => {
    const values = watch();
    const isComplete = values.name && values.shop_name
    && values.company_number
    && values.attachment_urls;
    setIsStepComplete(!!isComplete);
  }, [watchedValues, setIsStepComplete, watch]);

  return (
    <div className={styles['owner-info-container']}>
      <div className={styles['owner-name']}>
        <span className="owner-name__label">대표자명(실명)</span>
        <input
          {...register('name', {
            required: {
              value: true,
              message: '이름을 입력해주세요',
            },
          })}
          placeholder="이름을 입력해주세요."
        />
        {errors.name && <span className={styles['error-message']}>{errors.name.message}</span>}
      </div>
      <div className={styles['shop-name']}>
        <span className="shop-name__label">가게명</span>
        <div className={styles['shop-search-box']}>
          <input
            {...register('shop_name', {
              required: {
                value: true,
                message: '가게명을 입력해주세요',
              },
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value: /^[가-힣a-zA-Z\s\-\.\&]+$/,
                message: '유효한 가게명을 입력해주세요',
              },
            })}
            placeholder="가게명을 입력해주세요."
            className={styles['shop-name__input']}
            value={watch('shop_name')}
          />
          <button
            type="button"
            className={styles['search-button']}
            onClick={() => setTimeout(onSearch, 250)}
          >
            가게 검색
          </button>
        </div>
        {errors.shop_name && <span className={styles['error-message']}>{errors.shop_name.message}</span>}
      </div>
      <div className={styles['company-registration-number']}>
        <span className="company-registration-number__label">사업자 등록번호</span>
        <input
          {...register('company_number', {
            required: {
              value: true,
              message: '사업자 등록번호를 입력해주세요.',
            },
            pattern: {
              value: /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/,
              message: '형식에 맞게 작성해주세요.',
            },
          })}
          placeholder="숫자만 입력해주세요."
          type="text"
          inputMode="numeric"
          onChange={handleCompanyNumberChange}
        />
        {errors.company_number && <span className={styles['error-message']}>{errors.company_number.message}</span>}
      </div>
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
