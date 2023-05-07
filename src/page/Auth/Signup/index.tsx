import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { useEffect, useState } from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Back } from 'assets/svg/common/back-arrow.svg';
import UserEmail from './component/UserEmail';
import ProgressBar from './component/ProgressBar';
import OwnerData from './view/OwnerDataPage';
import TermsOfService from './view/TermsOfServicePage';
import UserData from './view/UserDataPage';
import styles from './SignUp.module.scss';
import Complete from './view/CompletePage';

export default function Signup() {
  const [step, setStep] = useState(0);

  const { isMobile } = useMediaQuery();
  useEffect(() => {
    setStep(0);
  }, [isMobile]);

  const PC_STEPS = [<TermsOfService clickEvent={() => setStep(step + 1)} />,
    <UserData clickEvent={() => setStep(step + 1)} />,
    <OwnerData />];

  const MOBILE_STEPS = [<TermsOfService clickEvent={() => setStep(step + 1)} />,
    <UserData clickEvent={() => setStep(step + 1)} />,
    <UserEmail clickEvent={() => setStep(step + 1)} />,
    <OwnerData clickEvent={() => setStep(step + 1)} />];

  return (
    <div className={styles['section-wrapper']}>
      {!isMobile
        ? (
          <>
            {step < 3 && (
              <section className={styles['signup-section']}>
                <Logo className={styles['signup-section__logo']} />
                <div className={styles['step-wrapper']}>
                  {PC_STEPS[step]}
                </div>
                <div className={styles['signup-section__next-button--pc']}>
                  <CustomButton type="large" disable content="다음" onClick={() => setStep(step + 1)} />
                </div>
              </section>
            )}
            {step === 3 && <Complete />}
          </>
        )
        : (
          <>
            {step < 4 && (
            <>
              <div className={styles['back-button']}><Back onClick={() => setStep(step - 1)} /></div>
              <section className={styles['signup-section']}>
                <span className={styles['signup-section__section-name']}>
                  사장님용
                  <br />
                  회원가입
                </span>
                <div className={styles['step-wrapper']}>
                  {step !== 0 && <ProgressBar step={step} />}
                  {step < 4 && (
                    MOBILE_STEPS[step]
                  )}
                </div>
              </section>
            </>
            )}
            {step === 4 && <Complete />}
          </>
        )}
    </div>
  );
}
