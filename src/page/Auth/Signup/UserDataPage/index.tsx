import UserEmail from 'component/SignUp/UserEmail';
import UserId from 'component/SignUp/UserId';
import UserPassword from 'component/SignUp/UserPassword';
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
