import { useEffect, useState } from 'react';
import { ReactComponent as NonCheck } from 'assets/svg/auth/non-check.svg';
import { ReactComponent as Check } from 'assets/svg/auth/checked.svg';
import { ReactComponent as Error } from 'assets/svg/auth/error-icon.svg';
import { useFormContext } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import TERMS from 'page/Auth/Signup/constant/terms';
import cn from 'utils/ts/className';
// eslint-disable-next-line
import styles from './SignUp.module.scss';

interface Step {
  index: number;
  setIsStepComplete: (state: boolean) => {};
}

interface SelectOptions {
  personal: boolean;
  koin: boolean;
}

const initialSelectOption: SelectOptions = {
  personal: false,
  koin: false,
};

export default function SignUp() {
  const { register, formState: { errors } } = useFormContext();
  const [selectItems, setSelectItems] = useState<SelectOptions>(initialSelectOption);
  const steps = useOutletContext<Step>();
  const handleSelect = (option: keyof SelectOptions | 'all') => {
    if (option === 'all') {
      const newState = !(selectItems.personal && selectItems.koin);
      setSelectItems({
        personal: newState,
        koin: newState,
      });
    } else {
      setSelectItems((prevState) => ({
        ...prevState,
        [option]: !prevState[option],
      }));
    }
  };

  useEffect(() => {
    setSelectItems(initialSelectOption);
  }, [steps.index]);

  useEffect(() => {
    if (selectItems.koin && selectItems.personal) {
      steps.setIsStepComplete(true);
    } else {
      steps.setIsStepComplete(false);
    }
  }, [selectItems, steps]);

  const checkErrorMessage = (error: any): string => {
    if (typeof error === 'string') {
      return error;
    }
    if (error && typeof error.message === 'string') {
      return error.message;
    }
    return '';
  };

  return (
    <>
      {steps.index === 0 && (
        <div className={styles['step-one']}>
          <div className={styles['agree-all']}>
            <button type="button" className={styles['agree-all__button']} onClick={() => handleSelect('all')}>
              {selectItems.personal && selectItems.koin ? <Check /> : <NonCheck />}
              <span className="agree-all__text">모두 동의합니다.</span>
            </button>
          </div>
          <div className={styles.personal}>
            <button type="button" className={styles.personal__button} onClick={() => handleSelect('personal')}>
              {selectItems.personal ? <Check /> : <NonCheck />}
              <span className="personal__text">개인정보 이용약관(필수)</span>
            </button>
            <div className={styles.personal__content}>{TERMS[0].text}</div>
          </div>
          <div className={styles.koin}>
            <button type="button" className={styles.koin__button} onClick={() => handleSelect('koin')}>
              {selectItems.koin ? <Check /> : <NonCheck />}
              <span className="koin__text">코인 이용약관(필수)</span>
            </button>
            <div className={styles.personal__content}>{TERMS[1].text}</div>
          </div>
        </div>
      )}
      {steps.index === 1 && (
        <div className={styles['default-info']}>
          <div className={`${styles['phone-number']} ${styles['input-box']}`}>
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
                  [styles['error-border']]: checkErrorMessage(errors.phoneNumber?.message).length > 0,
                })}
                placeholder="-없이 번호를 입력해주세요."
              />
              <button type="button" className={styles['phone-number']}>중복확인</button>
            </div>
            <div className={styles['error-message']}>{checkErrorMessage(errors.phoneNumber?.message)}</div>
          </div>
          <div className={`${styles['verification-code']} ${styles['input-box']}`}>
            <span className={styles['verification-code__label']}>인증번호</span>
            <div className={styles['input-container']}>
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
                placeholder="인증번호를 입력해주세요."
              />
              <button type="button" className={styles['verification-code__button']}>
                인증번호 발송
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
            <input {...register('password-confirm')} type="password" placeholder="인증번호를 입력해주세요." />
          </div>
        </div>
      )}
      {steps.index === 2 && (
        <div>
          {/* UI for step 2 */}
          <span className={styles.password}>비밀번호</span>
          <input {...register('password')} type="password" />
        </div>
      )}
    </>
  );
}
