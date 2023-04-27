import UserEmail from 'page/Auth/Signup/component/UserEmail';
import UserId from 'page/Auth/Signup/component/UserId';
import UserPassword from 'page/Auth/Signup/component/UserPassword';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './UserData.module.scss';

export default function UserData() {
  const { isMobile } = useMediaQuery();
  return (
    <section className={styles.form}>
      <UserId />
      <UserPassword />
      {!isMobile && <UserEmail />}
    </section>
  );
}
