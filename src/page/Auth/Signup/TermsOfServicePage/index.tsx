import Term from 'component/SignUp/Term';
import styles from './TermsOfService.module.scss';

export default function TermsOfService() {
  return (
    <section className={styles['term--section']}>
      <div className={styles['agree--all']}>
        <label htmlFor="terms" className={styles['agree--all__content']}>
          <input id="terms" type="checkbox" className={styles['term--section__checkbox']} />
          아래 이용약관에 모두 동의합니다.
        </label>
      </div>
      <Term id="term1" />
      <Term id="term2" />
    </section>
  );
}
