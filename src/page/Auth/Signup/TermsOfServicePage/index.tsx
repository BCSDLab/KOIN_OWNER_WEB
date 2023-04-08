import Term from 'component/SignUp/Term';
import styles from './TermsOfService.module.scss';

export default function TermsOfService() {
  return (
    <section>
      <div className={styles.terms_check}>
        <label htmlFor="terms" className={styles.check_all}>
          <input id="terms" type="checkbox" className={styles.checkbox} />
          아래 이용약관에 모두 동의합니다.
        </label>
      </div>
      <Term id="term1" />
      <Term id="term2" />
    </section>
  );
}
