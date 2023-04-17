import CustomButton from 'component/SignUp/CustomButton';
import { useState } from 'react';
import OwnerData from './OwnerDataPage';
import TermsOfService from './TermsOfServicePage';
import UserData from './UserDataPage';
import styles from './SignUp.module.scss';
import Complete from './CompletePage';
import { ReactComponent as Logo } from '../../../assets/svg/common/koin-logo.svg';

export default function Signup() {
  const [step, setStep] = useState(0);
  return (
    <>
      {step < 3 && (
      <section className={styles['signup-section']}>
        <Logo className={styles['signup-section__logo']} />
        {step === 0 && <TermsOfService />}
        {step === 1 && <UserData />}
        {step === 2 && <OwnerData />}
        <div className={styles['signup-section__next-button']}>
          <CustomButton type="large" disable content="다음" event={() => setStep(step + 1)} />
        </div>
      </section>
      )}
      {step === 3 && <Complete />}
    </>

  );
}
