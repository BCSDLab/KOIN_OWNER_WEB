import { useFormContext } from 'react-hook-form';
import styles from './ownerInfoStep.module.scss';

interface OwnerInfo {
  ownerName: string;
  shopName: string;
  companyRegistrationNumber: string;
  verificationFile: string;
}
export default function OwnerInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OwnerInfo>();

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
        <input
          type="file"
          {...register('verificationFile', {
            required: {
              value: true,
              message: '파일을 업로드해주세요',
            },
          })}
        />
        {errors.verificationFile && <span className={styles['error-message']}>{errors.verificationFile.message}</span>}
      </div>
    </div>
  );
}
