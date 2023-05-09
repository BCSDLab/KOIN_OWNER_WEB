import { useEffect, useState } from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Back } from 'assets/svg/common/back-arrow.svg';
import { Link } from 'react-router-dom';
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

  const PC_STEPS = [
    <TermsOfService clickEvent={() => setStep(step + 1)} />,
    <UserData clickEvent={() => setStep(step + 1)} />,
    <OwnerData clickEvent={() => setStep(step + 1)} />,
  ];

  const MOBILE_STEPS = [
    <TermsOfService clickEvent={() => setStep(step + 1)} />,
    <UserData clickEvent={() => setStep(step + 1)} />,
    <UserEmail clickEvent={() => setStep(step + 1)} />,
    <OwnerData clickEvent={() => setStep(step + 1)} />,
  ];

  return (
    <div className={styles.page}>
      {!isMobile
        ? (
          <>
            {step < 3 && (
              <section className={styles.section}>
                <Logo className={styles.section__logo} />
                <div className={styles.section__steps}>
                  {PC_STEPS[step]}
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
              {step === 0 ? (
                <Link to="/login" className={styles['back-button']}>
                  <Back />
                </Link>
              ) : (
                <div className={styles['back-button']}>
                  <Back onClick={() => setStep(step - 1)} />
                </div>
              )}
              <section className={styles.section}>
                <span className={styles.section__name}>
                  사장님용
                  <br />
                  회원가입
                </span>
                <div className={styles.section__steps}>
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
