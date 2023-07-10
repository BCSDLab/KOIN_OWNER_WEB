import UserEmail from 'page/Auth/Signup/component/UserEmail';
import UserId from 'page/Auth/Signup/component/UserId';
import UserPassword from 'page/Auth/Signup/component/UserPassword';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { useEffect, useState } from 'react';
import { RegisterData } from 'page/Auth/Signup/types/RegisterData';
import useStepStore from 'store/useStepStore';
// eslint-disable-next-line import/no-named-as-default
import useCheckNextStep from 'page/Auth/Signup/hooks/useCheckNextStep';
import { RegisterParam } from 'api/register/model';
import styles from './UserData.module.scss';

type ButtonClickEventProps = {
  clickEvent: () => void;
};

const useCheckEmailStep = () => {
  const [isFilled, setIsFilled] = useState(false);
  const checkEmailStep = (userData:RegisterData) => {
    if (RegisterParam.pick({ email: true, password: true }).safeParse(userData).success) {
      setIsFilled(true);
    }
  };
  return { isFilled, checkEmailStep };
};
export default function UserData({ clickEvent }:ButtonClickEventProps) {
  const { isMobile } = useMediaQuery();
  const [userData, setData] = useState<RegisterData>({});
  const { isDone, checkNextStep } = useCheckNextStep();
  const { increaseStep, step } = useStepStore();
  const [registerStep, setRegisterStep] = useState(0);
  const { isFilled, checkEmailStep } = useCheckEmailStep();

  useEffect(() => {
    if (step === 1) {
      setRegisterStep(0);
    }
  }, [step]);

  useEffect(() => {
    if (isMobile) {
      checkEmailStep(userData);
    }
    checkNextStep(userData);
    console.log(userData);
  }, [userData, checkNextStep, isMobile, checkEmailStep]);

  const goEmailAuth = () => {
    setRegisterStep(1);
    increaseStep();
  };

  return (
    !isMobile
      ? (
        <>
          <section className={styles.form}>
            <UserId setId={setData} userData={userData} />
            <UserPassword setPassword={setData} userData={userData} />
            <UserEmail setAuthenticate={setData} userData={userData} />
          </section>
          <div className={styles.buttons}>
            <CustomButton buttonSize="large" content="다음" onClick={clickEvent} disable={!isDone} />
          </div>
        </>
      )
      : (
        <>
          <section className={styles.form}>
            {registerStep === 0 ? (
              <>
                <UserId setId={setData} userData={userData} />
                <UserPassword setPassword={setData} userData={userData} />
              </>
            ) : <UserEmail setAuthenticate={setData} userData={userData} />}
          </section>
          <div className={styles.buttons}>
            {registerStep === 0 && <CustomButton buttonSize="large" content="이메일 인증하기" onClick={goEmailAuth} disable={!isFilled} />}
            {registerStep > 1 && <CustomButton buttonSize="large" content="다음" onClick={clickEvent} disable={!isDone} />}

          </div>
        </>
      )
  );
}
