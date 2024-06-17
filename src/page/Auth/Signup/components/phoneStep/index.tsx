import { ReactComponent as Error } from 'assets/svg/auth/error-icon.svg';
import {
  useFormContext, UseFormClearErrors, UseFormGetValues, UseFormSetError,
} from 'react-hook-form';
import {
  useState, useEffect, ChangeEvent,
} from 'react';
import cn from 'utils/ts/className';
import { verificationAuthCode, getPhoneAuthCode } from 'api/register';
import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { useDebounce } from 'utils/hooks/useDebounce';
import { PhoneNumberRegisterParam } from 'model/register';
import styles from './phoneStep.module.scss';

interface PhoneStepProps {
  setIsStepComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Verify {
  phoneNumber: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
}

interface SendCodeParams {
  getValues: UseFormGetValues<Verify>;
  setError: UseFormSetError<Verify>;
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>;
}

const code = ({ getValues, setError, setIsSent }: SendCodeParams) => {
  const phoneNumber = getValues('phoneNumber');
  const phoneNumberParam: PhoneNumberRegisterParam = { phone_number: phoneNumber };
  getPhoneAuthCode(phoneNumberParam)
    .then(() => {
      setIsSent(true);
    })
    .catch((e) => {
      if (isKoinError(e)) {
        setError('phoneNumber', { type: 'custom', message: e.message });
      }
    });
};

const useCheckCode = (
  getValues: UseFormGetValues<Verify>,
  setError: UseFormSetError<Verify>,
  clearErrors: UseFormClearErrors<Verify>,
) => {
  const [certificationCode, setCertificationCode] = useState<string>('');
  const [isCertified, setIsCertified] = useState<boolean>(false);

  useEffect(() => {
    if (certificationCode.length === 6) {
      verificationAuthCode({
        certification_code: certificationCode,
        phone_number: getValues('phoneNumber'),
      })
        .then(() => {
          setIsCertified(true);
          clearErrors();
        })
        .catch((e) => {
          if (isKoinError(e)) {
            setError('verificationCode', { type: 'error', message: e.message });
          } else {
            sendClientError(e);
          }
        });
    }
  }, [certificationCode, getValues, setError, clearErrors]);

  return { setCertificationCode, isCertified };
};

export default function PhoneStep({ setIsStepComplete }: PhoneStepProps) {
  const {
    register, formState: { errors }, getValues, setError, clearErrors, watch,
  } = useFormContext<Verify>();

  const [isSent, setIsSent] = useState(false);
  const debounce = useDebounce<SendCodeParams>(code, { getValues, setError, setIsSent });

  const { setCertificationCode, isCertified } = useCheckCode(
    getValues,
    setError,
    clearErrors,
  );

  const sendCode = () => {
    if (!getValues('phoneNumber')) {
      setError('phoneNumber', { type: 'custom', message: '필수 입력 항목입니다.' });
      return;
    }
    debounce();
  };

  const setCode = (e: ChangeEvent<HTMLInputElement>) => setCertificationCode(e.target.value);

  const watchedValues = watch(['phoneNumber', 'verificationCode', 'password', 'passwordConfirm']);

  useEffect(() => {
    const values = getValues();
    const isComplete = (
      values.password === values.passwordConfirm
       && values.password.length > 0
    ) && isCertified && !!errors;
    if (isComplete) {
      setIsStepComplete(true);
    } else {
      setIsStepComplete(false);
    }
  }, [watchedValues, isCertified, getValues, setIsStepComplete, errors]);

  return (
    <div className={styles['default-info']}>
      <div className={styles['phone-number']}>
        <span className={styles['phone-number__label']}>전화번호</span>
        <div className={styles['input-container']}>
          <input
            {...register('phoneNumber', {
              required: {
                value: true,
                message: '전화번호를 입력해주세요',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: '숫자만 입력 가능합니다',
              },
            })}
            className={cn({
              [styles['phone-number__input']]: true,
              [styles['error-border']]: !!errors.phoneNumber,
            })}
            placeholder="-없이 번호를 입력해주세요."
          />
          <button type="button" className={styles['phone-number__button']} onClick={sendCode} disabled={isCertified}>
            중복 확인
          </button>
        </div>
        <div className={styles['error-message']}>
          {errors.phoneNumber && <Error />}
          {errors.phoneNumber?.message}
        </div>
      </div>
      <div className={`${styles['verification-code']} ${styles['input-box']}`}>
        <span className={styles['verification-code__label']}>인증번호</span>
        <div className={styles['input-container']}>
          <input
            className={cn({
              [styles['verification-code__input']]: true,
              [styles['error-border']]: !!errors.verificationCode,
            })}
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
            placeholder="인증번호를 입력해주세요."
            maxLength={6}
            onChange={setCode}
            disabled={isCertified}
          />
          <button
            type="button"
            className={cn({
              [styles['verification-code__button']]: true,
              [styles['verification-code__button--active']]: isSent,
            })}
            onClick={sendCode}
            disabled={isCertified}
          >
            {isSent ? '인증번호 재발송' : '인증번호 발송'}
          </button>

        </div>
        <div className={styles['error-message']}>
          {errors.verificationCode && (
            <>
              <Error />
              {errors.verificationCode.message}
            </>
          )}
        </div>
      </div>
      <div className={`${styles.password} ${styles['input-box']}`}>
        <span className={styles.password__label}>비밀번호</span>
        <input {...register('password')} type="password" placeholder="비밀번호를 입력해주세요" />
      </div>
      <div className={`${styles['password-confirm']} ${styles['input-box']}`}>
        <span className={styles.password__label}>비밀번호 확인</span>
        <input {...register('passwordConfirm')} type="password" placeholder="비밀번호를 확인해주세요." />
      </div>
    </div>
  );
}