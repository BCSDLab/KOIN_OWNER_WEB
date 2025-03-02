import { useEffect } from 'react';
import { useFormContext, UseFormSetError } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { ChangePasswordForm } from 'model/auth';
import { OutletProps } from 'page/Auth/FindPassword/entity';
import Warning from 'assets/svg/auth/warning.svg?react';
import styles from 'page/Auth/FindPassword/index.module.scss';
import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { Button } from 'page/Auth/components/Common/form';
import sha256 from 'utils/ts/SHA-256';
import { changePassword } from 'api/auth';
import { useMutation } from '@tanstack/react-query';

interface ChangePasswordProps {
  setError: UseFormSetError<ChangePasswordForm>;
  nextStep: () => void;
}

const useChangePassword = ({ setError, nextStep } : ChangePasswordProps) => {
  const mutate = useMutation({
    mutationFn: async (data: { phone_number: string, password: string }) => {
      const hashPassword = await sha256(data.password);
      changePassword({ phone_number: data.phone_number, password: hashPassword });
    },
    onError: (e) => {
      if (isKoinError(e)) {
        setError('password', { type: 'custom', message: e.message });
      } else {
        sendClientError(e);
      }
    },
    onSuccess: () => nextStep(),
  });

  return mutate;
};

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;

export default function ChangePassword() {
  const {
    register, formState: { errors, isValid }, getValues, clearErrors, setError,
  } = useFormContext<ChangePasswordForm>();

  const steps = useOutletContext<OutletProps>();
  const { setIsStepComplete } = steps;
  const mutation = useChangePassword({ setError, nextStep: steps.nextStep });

  useEffect(() => {
    if (isValid) {
      clearErrors();
      setIsStepComplete(true);
    } else {
      setIsStepComplete(false);
    }
  }, [isValid, clearErrors, setIsStepComplete]);

  return (
    <form className={styles.container}>
      <section className={styles.section}>
        <div className={styles.title}>새 비밀번호</div>
        <input
          className={styles['password-input']}
          type="password"
          placeholder="새 비밀번호를 입력해주세요."
          {...register('password', {
            required: {
              value: true,
              message: '필수 입력 항목입니다.',
            },
            pattern: {
              value: passwordRegex,
              message: '특수문자 포함 영어와 숫자 6~18 자리로 입력해주세요.',
            },
          })}
        />
        {
          errors.password
            ? (
              <div className={styles.error}>
                <Warning />
                {errors.password.message}
              </div>
            ) : (
              <div className={styles.comment}>
                * 특수문자 포함 영어와 숫자 6~18 자리
              </div>
            )
        }
      </section>
      <section className={styles.section}>
        <div className={styles.title}>새 비밀번호 확인</div>
        <input
          className={styles['password-input']}
          type="password"
          placeholder="새 비밀번호를 다시 입력해주세요."
          {...register('passwordCheck', {
            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        {
          errors.passwordCheck && (
            <div className={styles.error}>
              <Warning />
              {errors.passwordCheck.message}
            </div>
          )
        }
      </section>
      <Button
        disabled={!isValid}
        onClick={() => {
          const data = { phone_number: getValues('phone_number'), password: getValues('password') };
          mutation.mutate(data);
        }}
      >
        완료
      </Button>
    </form>
  );
}
