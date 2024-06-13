import { useFormContext } from 'react-hook-form';
import styles from './ownerInfoStep.module.scss';

interface OwnerInfo {
  phoneNumber: string;
  verificationCode: string;
  password: string;
  'password-confirm': string;
}
export default function OwnerInfoStep() {
  const {
    register,
  } = useFormContext<OwnerInfo>();
  return (
    <div className={styles['owner-info-container']}>
      <div className={styles['owner-name']}>
        <span className="owner-name__label">대표자명(실명)</span>
        <input
          {...register('verificationCode', {
            required: {
              value: true,
              message: '인증번호를 입력해주세요',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: '인증번호가 일치하지 않습니다.',
            },
          })}
          placeholder="이름를 입력해주세요."
        />
      </div>
      <div className={styles['shop-name']}>
        <span className="shop-name__label">가게명</span>
        <input
          {...register('verificationCode', {
            required: {
              value: true,
              message: '인증번호를 입력해주세요',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: '인증번호가 일치하지 않습니다.',
            },
          })}
          placeholder="이름를 입력해주세요."
        />
      </div>
      <div className={styles['company-registration-number']}>
        <span className="company-registration-number__label">사업자 등록번호</span>
        <input
          {...register('verificationCode', {
            required: {
              value: true,
              message: '인증번호를 입력해주세요',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: '인증번호가 일치하지 않습니다.',
            },
          })}
          placeholder="이름를 입력해주세요."
        />
      </div>
      <div className={styles['owner-phone']}>
        <span className="owner-phone__label">개인 연락처</span>
        <input
          {...register('verificationCode', {
            required: {
              value: true,
              message: '인증번호를 입력해주세요',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: '인증번호가 일치하지 않습니다.',
            },
          })}
          placeholder="이름를 입력해주세요."
        />
      </div>
      <div className={styles['document-input']}>
        <span className="document-input__label">사업자 인증 파일</span>
        <input
          {...register('verificationCode', {
            required: {
              value: true,
              message: '인증번호를 입력해주세요',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: '인증번호가 일치하지 않습니다.',
            },
          })}
          placeholder="이름를 입력해주세요."
        />
      </div>
    </div>
  );
}
