import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Back } from 'assets/svg/common/back-arrow.svg';
import { Link } from 'react-router-dom';
import ProgressBar from 'component/common/ProgressBar';
import PreviousStep from 'component/common/Auth/PreviousStep';
import OwnerData from './view/OwnerDataPage';
import TermsOfService from './view/TermsOfServicePage';
import UserData from './view/UserDataPage';
import styles from './SignUp.module.scss';
import Complete from './view/CompletePage';
import useRegisterStep from './hooks/useRegisterStep';

export default function Signup() {
  const { isMobile } = useMediaQuery();
  const {
    goNext, registerStep, goPrev, step,
  } = useRegisterStep();
  const STEPS = [
    <TermsOfService clickEvent={goNext} />,
    <UserData goNext={goNext} />,
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
              ) : <PreviousStep step={step} clickEvent={goPrev} />}
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
