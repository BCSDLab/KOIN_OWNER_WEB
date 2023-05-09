import UserEmail from 'page/Auth/Signup/component/UserEmail';
import UserId from 'page/Auth/Signup/component/UserId';
import UserPassword from 'page/Auth/Signup/component/UserPassword';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import styles from './UserData.module.scss';

type ButtonClickEventProps = {
  clickEvent: () => void;
};
export default function UserData({ clickEvent }:ButtonClickEventProps) {
  const { isMobile } = useMediaQuery();
  return (
    <>
      <section className={styles.form}>
        <UserId />
        <UserPassword />
        {!isMobile && <UserEmail />}
      </section>
      <div className={styles.buttons}>
        <CustomButton type="large" content={isMobile ? '이메일 인증하기' : '다음'} onClick={() => clickEvent()} />
      </div>
    </>
  );
}
