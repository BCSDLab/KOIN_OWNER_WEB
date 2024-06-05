import { isKoinError } from '@bcsdlab/koin';
import { useMutation } from '@tanstack/react-query';
import { sendVerifyCode, verifyCode } from 'api/auth';
import { useState } from 'react';
import {
  useFormContext, UseFormGetValues, UseFormSetError,
} from 'react-hook-form';
import styles from './index.module.scss';

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

const useCheckCode = () => {
  const mutate = useMutation({
    mutationFn: ({
      phone_number,
      certification_code,
    }: { phone_number: string, certification_code: string }) => verifyCode({
      phone_number,
      certification_code,
    }),
    onError: () => {
      //
    },
  });

  return mutate;
};

interface Verify {
  phone_number: string;
  certification_code: string;
}

export default function Verify() {
  const method = useFormContext<Verify>();
  const {
    register, getValues, setError, formState: { errors },
  } = method;
  const [isSent, setIsSent] = useState(false);
  const [id, setId] = useState<null | NodeJS.Timeout>(null);
  const mutate = useCheckCode();
  console.log(mutate);

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
          })}
          type="text"
          placeholder="-없이 번호를 입력해주세요."
        />
        <div className={styles.error}>
          {errors.phone_number && errors.phone_number.message}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.title}>인증번호</div>
        <div>
          <input
            className={styles.input}
            {...register('certification_code')}
            type="text"
            placeholder="인증번호를 입력해주세요."
            maxLength={6}
          />
          <button
            className={styles.button}
            type="button"
            onClick={sendCode}
          >
            {isSent ? '인증번호 재발송' : '인증번호 발송'}
          </button>
        </div>
        <div className={styles.error}>
          {errors.certification_code && errors.certification_code.message}
        </div>
      </section>
    </form>
  );
}
