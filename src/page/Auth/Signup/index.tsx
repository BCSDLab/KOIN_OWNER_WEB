import CustomButton from 'component/SignUp/CustomButton';
import { useEffect, useState } from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import UserEmail from 'component/SignUp/UserEmail';
import ProgressBar from 'component/SignUp/ProgressBar';
import OwnerData from './OwnerDataPage';
import TermsOfService from './TermsOfServicePage';
import UserData from './UserDataPage';
import styles from './SignUp.module.scss';
import Complete from './CompletePage';
import { ReactComponent as Logo } from '../../../assets/svg/common/koin-logo.svg';
import { ReactComponent as Back } from '../../../assets/svg/common/back-arrow.svg';

export default function Signup() {
  const [step, setStep] = useState(0);

  const { isMobile } = useMediaQuery();
  useEffect(() => {
    setStep(0);
  }, [isMobile]);

  return (
    <div className={styles['section-wrapper']}>
      {!isMobile
        ? (
          <>
            {step < 3 && (
              <section className={styles['signup-section']}>
                <Logo className={styles['signup-section__logo']} />
                <div className={styles['step-wrapper']}>
                  {step === 0 && <TermsOfService />}
                  {step === 1 && <UserData />}
                  {step === 2 && <OwnerData />}
                </div>
                <div className={styles['signup-section__next-button--pc']}>
                  <CustomButton type="large" disable content="다음" event={() => setStep(step + 1)} />
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
              <Link to="/login" className={styles['back-button']}><Back /></Link>
              <section className={styles['signup-section']}>
                <span className={styles['signup-section__section-name']}>
                  사장님용
                  <br />
                  회원가입
                </span>
                <div className={styles['step-wrapper']}>
                  {step === 0 && (
                  <>
                    <TermsOfService />
                    <div className={styles['signup-section__button-group--mobile']}>
                      <Link to="/login" className={styles['signup-section__button--mobile']}>취소</Link>
                      <CustomButton type="mobile" content="확인" event={() => setStep(step + 1)} />
                    </div>
                  </>
                  )}
                  {step === 1 && (
                  <>
                    <ProgressBar step={step} />
                    <UserData />
                    <div className={styles['signup-section__button-group--mobile']}>
                      <CustomButton type="large" content="이메일 인증하기" event={() => setStep(step + 1)} />
                    </div>
                  </>
                  )}
                  {step === 2 && (
                  <>
                    <ProgressBar step={step} />
                    <UserEmail />
                    <div className={styles['signup-section__button-group--mobile']}>
                      <CustomButton type="mobile" content="재발송" event={() => { alert('재발송'); }} />
                      <CustomButton type="mobile" content="다음" event={() => setStep(step + 1)} />
                    </div>
                  </>
                  )}
                  {step === 3 && (
                  <>
                    <ProgressBar step={step} />
                    <OwnerData />
                    <div className={styles['signup-section__button-group--mobile']}>
                      <CustomButton type="large" content="다음" event={() => setStep(step + 1)} />
                    </div>
                  </>
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
