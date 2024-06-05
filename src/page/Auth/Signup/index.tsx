import { useState } from 'react';
import { ReactComponent as NonCheck } from 'assets/svg/auth/non-check.svg';
import { ReactComponent as Check } from 'assets/svg/auth/checked.svg';
import { useFormContext } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
// eslint-disable-next-line
import styles from './Signup.module.scss';

interface Step {
  index: number;
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
  const { register } = useFormContext();
  const [selectItems, setSelectItems] = useState<SelectOptions>(initialSelectOption);

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

  const steps = useOutletContext<Step>();

  return (
    <>
      {steps.index === 0 && (
        <div className={styles['step-one']}>
          <div className={styles['agree-all']}>
            <button type="button" className="agree-all--button" onClick={() => handleSelect('all')}>
              {selectItems.personal && selectItems.koin
                ? <Check />
                : <NonCheck />}
              <span className="agree-all--text">모두 동의합니다.</span>
            </button>
          </div>
          <div className={styles.personal}>
            <button type="button" className="personal--button" onClick={() => handleSelect('personal')}>
              {selectItems.personal ? <Check /> : <NonCheck />}
              <span className="personal--text">개인정보 이용약관(필수)</span>
            </button>
          </div>
          <div className={styles.koin}>
            <button type="button" className="koin--button" onClick={() => handleSelect('koin')}>
              {selectItems.koin ? <Check /> : <NonCheck />}
              <span className="koin--text">개인정보 이용약관(필수)</span>
            </button>
          </div>
        </div>
      )}
      {steps.index === 1 && (
        <div>
          {/* UI for step 1 */}
          <span className={styles['phone-number']}>전화번호</span>
          <input {...register('phone_number')} />
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
