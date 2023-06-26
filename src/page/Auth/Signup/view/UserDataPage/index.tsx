import UserEmail from 'page/Auth/Signup/component/UserEmail';
import UserId from 'page/Auth/Signup/component/UserId';
import UserPassword from 'page/Auth/Signup/component/UserPassword';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { useEffect, useState } from 'react';
import { RegisterData } from 'page/Auth/Signup/types/UserData';
import styles from './UserData.module.scss';

type ButtonClickEventProps = {
  clickEvent: () => void;
};
export default function UserData({ clickEvent }:ButtonClickEventProps) {
  const { isMobile } = useMediaQuery();
  const [isDone, setDone] = useState(false);
  console.log(setDone);
  const [userData, setData] = useState<RegisterData>();
  useEffect(() => {
    console.log(userData, setDone, 'asdf');
  }, [userData]);
  return (
    <>
      <section className={styles.form}>
        <UserId setId={setData} userData={userData} />
        <UserPassword />
        {!isMobile && <UserEmail />}
      </section>
      <div className={styles.buttons}>
        <CustomButton buttonSize="large" content={isMobile ? '이메일 인증하기' : '다음'} onClick={() => clickEvent()} disable={!isDone} />
      </div>
    </>
  );
}
