import { isKoinError } from '@bcsdlab/koin';
import { sendVerifyCode, verifyCode } from 'api/auth';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  UseFormClearErrors,
  useFormContext, UseFormGetValues, UseFormSetError,
} from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import cn from 'utils/ts/className';
import { ReactComponent as Warning } from 'assets/svg/auth/warning.svg';
import styles from './index.module.scss';
// eslint-disable-next-line
import { OutletProps } from '..';

// 코드 발송 및 에러 처리
const code = (
  getValues: UseFormGetValues<Verify>,
  setError: UseFormSetError<Verify>,
  setIsSent: React.Dispatch<React.SetStateAction<boolean>>,
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
          }
          setIsStepComplete(false);
        });
    }
  }, [certificationCode, setIsStepComplete, getValues, setError, clearErrors]);

  return { setCertificationCode, isCertified };
};

interface Verify {
  phone_number: string;
  certification_code: string;
}

export default function Verify() {
  const method = useFormContext<Verify>();
  const {
    register, getValues, setError, formState: { errors }, watch, clearErrors,
  } = method;
  const [isSent, setIsSent] = useState(false);
  const [id, setId] = useState<null | NodeJS.Timeout>(null);
  const steps: OutletProps = useOutletContext();

  const { setCertificationCode, isCertified } = useCheckCode(
    steps.setIsStepComplete,
    getValues,
    setError,
    clearErrors,
  );

  // 디바운싱
  const debounce = () => {
    if (id) clearTimeout(id);
    const timeId = setTimeout(() => code(getValues, setError, setIsSent), 200);
    setId(timeId);
  };

  const sendCode = () => {
    if (getValues('phone_number').length === 0) {
      setError('phone_number', { type: 'custom', message: '필수 입력 항목입니다.' });
      return;
    }
    debounce();
  };

  const setCode = (e: ChangeEvent<HTMLInputElement>) => setCertificationCode(e.target.value);

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
            maxLength: 11,
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
            disabled={isCertified}
          />
          <button
            className={cn({
              [styles.button]: true,
              [styles['button--active']]: watch('phone_number') && watch('phone_number').length === 11,
              [styles['button--error']]: !!errors.certification_code,
            })}
            type="button"
            onClick={sendCode}
            disabled={isCertified}
          >
            {isSent ? '인증번호 재발송' : '인증번호 발송'}
          </button>
        </div>
        {errors.certification_code
          && (
            <div className={styles.error}>
              <Warning />
              {errors.certification_code.message}
            </div>
          )}
      </section>
    </form>
  );
}
