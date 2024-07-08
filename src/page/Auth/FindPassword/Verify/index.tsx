import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { sendVerifyCode, verifyCode } from 'api/auth';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  UseFormClearErrors,
  useFormContext, UseFormGetValues, UseFormSetError,
} from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import cn from 'utils/ts/className';
import { ReactComponent as Warning } from 'assets/svg/auth/warning.svg';
import styles from 'page/Auth/FindPassword/index.module.scss';
import { OutletProps } from 'page/Auth/FindPassword/entity';
import { useDebounce } from 'utils/hooks/useDebounce';

interface SendCode {
  getValues: UseFormGetValues<Verify>;
  setError: UseFormSetError<Verify>;
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>;
}

// 코드 발송 및 에러 처리
const code = (
  {
    getValues,
    setError,
    setIsSent,
  }: SendCode,
) => {
  sendVerifyCode(getValues('phone_number'))
    .then(() => setIsSent(true))
    .catch((e) => {
      if (isKoinError(e)) {
        setError('phone_number', { type: 'custom', message: e.message });
      }
    });
};

const useCheckCode = (
  setIsStepComplete: React.Dispatch<React.SetStateAction<boolean>>,
  getValues: UseFormGetValues<Verify>,
  setError: UseFormSetError<Verify>,
  clearErrors: UseFormClearErrors<Verify>,
) => {
  const [certificationCode, setCertificationCode] = useState<string>('');
  const [isCertified, setIsCertified] = useState<boolean>(false);

  const setCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCertificationCode(e.target.value);
    if (e.target.value.length < 6) {
      setError('certification_code', { message: '필수 입력 항목입니다.' });
      setIsCertified(false);
      setIsStepComplete(false);
      return;
    }
    clearErrors();
  };

  useEffect(() => {
    if (certificationCode.length === 6) {
      verifyCode({
        certification_code: certificationCode,
        phone_number: getValues('phone_number'),
      }).then((data) => {
        setIsStepComplete(true);
        setIsCertified(true);
        clearErrors();
        sessionStorage.setItem('accessToken', data.data.token);
      })
        .catch((e) => {
          if (isKoinError(e)) {
            setError('certification_code', { type: 'error', message: e.message });
          } else {
            sendClientError(e);
          }
          setIsStepComplete(false);
        });
    }
  }, [certificationCode, setIsStepComplete, getValues, setError, clearErrors]);

  return { certificationCode, setCode, isCertified };
};

interface Verify {
  phone_number: string;
  certification_code: string;
}

export default function Verify() {
  const {
    register, getValues, setError, formState: { errors }, watch, clearErrors,
  } = useFormContext<Verify>();

  const [isSent, setIsSent] = useState(false);
  const debounce = useDebounce<SendCode>(code, { getValues, setError, setIsSent });
  const steps = useOutletContext<OutletProps>();

  const { setCode, isCertified } = useCheckCode(
    steps.setIsStepComplete,
    getValues,
    setError,
    clearErrors,
  );

  const sendCode = () => {
    if (getValues('phone_number').length === 0) {
      setError('phone_number', { type: 'custom', message: '필수 입력 항목입니다.' });
      return;
    }
    debounce();
  };

  return (
    <form className={styles.container}>
      <section className={styles.section}>
        <div className={styles.title}>휴대폰 번호</div>
        <input
          className={styles.input}
          {...register('phone_number', {
            required: {
              value: true,
              message: '필수 입력 항목입니다.',
            },
            maxLength: {
              value: 11,
              message: '11자리의 숫자로 입력해주세요',
            },
          })}
          type="text"
          placeholder="-없이 번호를 입력해주세요."
        />
        {errors.phone_number
          && (
            <div className={styles.error}>
              <Warning />
              {errors.phone_number.message}
            </div>
          )}
      </section>
      <section className={styles.section}>
        <div className={styles.title}>인증번호</div>
        <div className={styles.verify}>
          <input
            className={styles['input--verify']}
            {...register('certification_code')}
            type="text"
            placeholder="인증번호를 입력해주세요."
            maxLength={6}
            onChange={setCode}
          />
          <button
            className={cn({
              [styles.button]: true || isCertified,
              [styles['button--active']]: watch('phone_number') && watch('phone_number').length === 11,
              [styles['button--error']]: !!errors.certification_code,
            })}
            type="button"
            onClick={sendCode}
          >
            {isSent ? '인증번호 재발송' : '인증번호 발송'}
          </button>
        </div>
        {
          errors.certification_code && (
            <div className={styles.error}>
              <Warning />
              {errors.certification_code.message}
            </div>
          )
        }
        {
          isCertified && (
            <div className={styles.error}>
              인증되었습니다
            </div>
          )
        }
      </section>
    </form>
  );
}
