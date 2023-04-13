import CustomButton from 'component/SignUp/CustomButton';
import { useState } from 'react';
import OwnerData from './OwnerDataPage';
import TermsOfService from './TermsOfServicePage';
import UserData from './UserDataPage';
import styles from './SignUp.module.scss';
import Complete from './CompletePage';

export default function Signup() {
  const [step, setStep] = useState(0);
  return (
    <section className={styles.page}>
      {step === 0 && <TermsOfService />}
      {step === 1 && <UserData />}
      {step === 2 && <OwnerData />}
      {step === 3 && <Complete />}
      {step < 3 && <CustomButton type="large" disable content="다음" event={() => setStep(step + 1)} />}
    </section>
  );
}
