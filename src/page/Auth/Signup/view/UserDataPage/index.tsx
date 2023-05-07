import UserEmail from 'page/Auth/Signup/component/UserEmail';
import UserId from 'page/Auth/Signup/component/UserId';
import UserPassword from 'page/Auth/Signup/component/UserPassword';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import styles from './UserData.module.scss';

type ButtonClickEvent = {
  clickEvent: () => void;
};
export default function UserData({ clickEvent }:ButtonClickEvent) {
  const { isMobile } = useMediaQuery();
  return (
    <section className={styles.form}>
      <UserId />
      <UserPassword />
      {!isMobile && <UserEmail />}
      {isMobile && (
        <div className={styles.buttons}>
          <CustomButton type="large" content="이메일 인증하기" onClick={() => clickEvent()} />
        </div>
      )}
    </section>
  );
}
