import CustomButton from 'component/SignUp/CustomButton';
import { useState } from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import OwnerData from './OwnerDataPage';
import TermsOfService from './TermsOfServicePage';
import UserData from './UserDataPage';
import styles from './SignUp.module.scss';
import Complete from './CompletePage';
import { ReactComponent as Logo } from '../../../assets/svg/common/koin-logo.svg';

export default function Signup() {
  const [step, setStep] = useState(0);
  const { isMobile } = useMediaQuery();
  return (
    <div className={styles['section-wrapper']}>
      {step < 3 && (
      <section className={styles['signup-section']}>
        <div>
          <Logo className={styles['signup-section__logo']} />
          <span className={styles['signup-section__section-name']}>
            사장님용
            <br />
            회원가입
          </span>
        </div>
        {!isMobile ? (
          <>
            {step === 0 && <TermsOfService />}
            {step === 1 && <UserData />}
            {step === 2 && <OwnerData />}
            <div className={styles['signup-section__next-button--pc']}>
              <CustomButton type="large" disable content="다음" event={() => setStep(step + 1)} />
            </div>
          </>
        ) : (
          <>
            {step === 0 && (
            <>
              <TermsOfService />
              <div className={styles['signup-section__button-group--mobile']}>
                <Link to="/login" className={styles['signup-section__button--mobile']}>취소</Link>
                <CustomButton type="mobile" content="확인" event={() => setStep(step + 1)} />
              </div>
            </>
            )}
            {step === 1 && <UserData />}
            {step === 2 && <OwnerData />}

          </>
        )}

      </section>
      )}
      {step === 3 && <Complete />}
    </div>

  );
}
