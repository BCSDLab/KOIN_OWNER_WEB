import { ReactComponent as NonCheck } from 'assets/svg/auth/non-check.svg';
import { ReactComponent as Check } from 'assets/svg/auth/checked.svg';
import TERMS from 'page/Auth/Signup/constant/terms';
import styles from './agreeStep.module.scss';

interface SelectOptions {
  personal: boolean;
  koin: boolean;
}

interface AgreeStepProps {
  selectItems: SelectOptions;
  handleSelect: (option: keyof SelectOptions | 'all') => void;
}

export default function AgreeStep({ selectItems, handleSelect }: AgreeStepProps) {
  return (
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
  );
}
