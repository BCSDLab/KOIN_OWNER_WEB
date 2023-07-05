import UserEmail from 'page/Auth/Signup/component/UserEmail';
import UserId from 'page/Auth/Signup/component/UserId';
import UserPassword from 'page/Auth/Signup/component/UserPassword';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { useEffect, useState } from 'react';
import { RegisterData } from 'page/Auth/Signup/types/RegisterData';
import useCheckNext from 'page/Auth/Signup/hooks/useCheckNext';
import styles from './UserData.module.scss';

type ButtonClickEventProps = {
  clickEvent: () => void;
};

export default function UserData({ clickEvent }:ButtonClickEventProps) {
  const { isMobile } = useMediaQuery();
  const [userData, setData] = useState<RegisterData>({});
  const { isDone, checkNextStep } = useCheckNext();

  useEffect(() => {
    checkNextStep(userData);
    console.log(userData);
  }, [userData, checkNextStep]);

  return (
    <>
      <section className={styles.form}>
        <UserId setId={setData} userData={userData} />
        <UserPassword setPassword={setData} userData={userData} />
        {!isMobile && <UserEmail setAuthenticate={setData} userData={userData} />}
      </section>
      <div className={styles.buttons}>
        <CustomButton buttonSize="large" content={isMobile ? '이메일 인증하기' : '다음'} onClick={() => clickEvent()} disable={!isDone} />
      </div>
    </>
  );
}
