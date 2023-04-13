import UserEmail from 'component/SignUp/UserEmail';
import UserId from 'component/SignUp/UserId';
import UserPassword from 'component/SignUp/UserPassword';
import styles from './UserData.module.scss';

export default function UserData() {
  return (
    <section className={styles.form}>
      <UserId />
      <UserPassword />
      <UserEmail />
    </section>
  );
}
