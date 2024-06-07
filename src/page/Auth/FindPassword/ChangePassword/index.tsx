import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { ChangePasswordForm } from 'model/auth';
import { OutletProps } from 'page/Auth/FindPassword/entity';
import { ReactComponent as Warning } from 'assets/svg/auth/warning.svg';
import styles from 'page/Auth/FindPassword/index.module.scss';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;

export default function ChangePassword() {
  const method = useFormContext<ChangePasswordForm>();
  const {
    register, formState: { errors, isValid }, getValues,
  } = method;
  const steps: OutletProps = useOutletContext();
  const { setIsStepComplete } = steps;

  useEffect(() => {
    if (isValid) {
      setIsStepComplete(true);
    } else {
      setIsStepComplete(false);
    }
  });

  return (
    <form className={styles.container}>
      <section className={styles.section}>
        <div className={styles.title}>새 비밀번호</div>
        <input
          className={styles.input}
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
        {errors.password
          ? (
            <div className={styles.error}>
              <Warning />
              {errors.password.message}
            </div>
          ) : <div className={styles.comment}>* 특수문자 포함 영어와 숫자 6~18 자리</div>}

      </section>
      <section className={styles.section}>
        <div className={styles.title}>새 비밀번호 확인</div>
        <input
          className={styles.input}
          type="password"
          placeholder="새 비밀번호를 다시 입력해주세요."
          {...register('passwordCheck', {
            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />

        {errors.passwordCheck
          && (
            <div className={styles.error}>
              <Warning />
              {errors.passwordCheck.message}
            </div>
          )}
      </section>
    </form>
  );
}
