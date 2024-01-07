import UserEmail from 'page/Auth/Signup/component/UserEmail';
import UserId from 'page/Auth/Signup/component/UserId';
import UserPassword from 'page/Auth/Signup/component/UserPassword';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { useEffect, useState } from 'react';
import { User, UserParam } from 'page/Auth/Signup/types/User';
import useStepStore from 'store/useStepStore';
import useCheckNext from 'page/Auth/Signup/hooks/useCheckNext';
import useRegisterInfo from 'store/registerStore';
import styles from './UserData.module.scss';

type ButtonClickEventProps = {
  goNext: () => void;
};

const useCheckEmail = () => {
  const [isFilled, setIsFilled] = useState(false);
  const checkEmail = (userData:User) => {
    if (UserParam.pick({ email: true, password: true }).safeParse(userData).success) {
      setIsFilled(true);
    }
  };
  return { isFilled, checkEmail };
};
export default function UserData({ goNext }:ButtonClickEventProps) {
  const { isMobile } = useMediaQuery();
  const { userInfo } = useRegisterInfo();
  const { isDone, checkUserData } = useCheckNext();
  const { increaseStep, step } = useStepStore();
  const [registerStep, setRegisterStep] = useState(0);
  const { isFilled, checkEmail } = useCheckEmail();
  useEffect(() => {
    if (step === 1) {
      setRegisterStep(0);
    }
  }, [step]);

  useEffect(() => {
    if (isMobile) {
      checkEmail(userInfo);
    }
    checkUserData(userInfo);
  }, [userInfo, checkUserData, isMobile, checkEmail]);

  const goEmailAuth = () => {
    setRegisterStep(1);
    increaseStep();
  };

  return (
    !isMobile
      ? (
        <>
          <section className={styles.form}>
            <UserId />
            <UserPassword />
            <UserEmail />
          </section>
          <div className={styles.buttons}>
            <CustomButton buttonSize="large" content="다음" onClick={goNext} disable={!isDone} />
          </div>
        </>
      )
      : (
        <>
          <section className={styles.form}>
            {registerStep === 0 ? (
              <>
                <UserId />
                <UserPassword />
              </>
            ) : <UserEmail />}
          </section>
          <div className={styles.buttons}>
            {registerStep === 0 && <CustomButton buttonSize="large" content="이메일 인증하기" onClick={goEmailAuth} disable={!isFilled} />}
            {registerStep > 1 && <CustomButton buttonSize="large" content="다음" onClick={goNext} disable={!isDone} />}
          </div>
        </>
      )
  );
}
