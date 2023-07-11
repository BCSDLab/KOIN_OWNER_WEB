import { useEffect, useState } from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Back } from 'assets/svg/common/back-arrow.svg';
import { Link } from 'react-router-dom';
import ProgressBar from 'component/common/ProgressBar';
import useStepStore from 'store/useStepStore';
import OwnerData from './view/OwnerDataPage';
import TermsOfService from './view/TermsOfServicePage';
import UserData from './view/UserDataPage';
import styles from './SignUp.module.scss';
import Complete from './view/CompletePage';

export default function Signup() {
  const {
    step, setStep, increaseStep, decreaseStep,
  } = useStepStore();
  const { isMobile } = useMediaQuery();
  const [registerStep, setRegisterStep] = useState(0);
  useEffect(() => {
    setStep(0);
    setRegisterStep(0);
  }, [isMobile, setStep]);

  const goNext = () => {
    increaseStep();
    setRegisterStep(registerStep + 1);
  };

  const goPrev = () => {
    if (registerStep === 2) {
      setRegisterStep(1);
      setStep(1);
    } else if (step === 2) {
      setStep(1);
      setRegisterStep(1);
    } else {
      setRegisterStep(registerStep - 1);
      decreaseStep();
    }
  };

  const STEPS = [
    <TermsOfService clickEvent={goNext} />,
    <UserData clickEvent={goNext} />,
    <OwnerData clickEvent={goNext} />,
  ];

  return (
    <div className={styles.page}>
      {!isMobile
        ? (
          <>
            {registerStep < 3 && (
              <section className={styles.section}>
                <Logo className={styles.section__logo} />
                <div className={styles.section__steps}>
                  {STEPS[registerStep]}
                </div>
              </section>
            )}
            {registerStep === 3 && <Complete />}
          </>
        )
        : (
          <>
            {registerStep < 3 && (
            <>
              {registerStep === 0 ? (
                <Link to="/login" className={styles['back-button']}>
                  <Back />
                </Link>
              ) : (
                <div className={styles['back-button']}>
                  <Back onClick={goPrev} />
                </div>
              )}
              <section className={styles.section}>
                <span className={styles.section__name}>
                  사장님용
                  <br />
                  회원가입
                </span>
                <div className={styles.section__steps}>
                  {registerStep < 3 && (
                    <>
                      {registerStep > 0 && <ProgressBar step={step} />}
                      {STEPS[registerStep]}
                    </>
                  )}
                </div>
              </section>
            </>
            )}
            {registerStep === 3 && <Complete />}
          </>
        )}
    </div>
  );
}
