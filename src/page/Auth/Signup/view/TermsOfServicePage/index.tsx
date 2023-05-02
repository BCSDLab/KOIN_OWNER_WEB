import Term from 'page/Auth/Signup/component/Term';
import styles from './TermsOfService.module.scss';

export default function TermsOfService() {
  return (
    <section className={styles['term-section']}>
      <div className={styles['agree--all']}>
        <label htmlFor="terms" className={styles['agree--all__content']}>
          <input id="terms" type="checkbox" className={styles['term-section__checkbox']} />
          <span className={styles['agree--all__pc--phrase']}>아래 이용약관에&nbsp;</span>
          모두 동의합니다.
        </label>
      </div>
      <Term id="term1" />
      <Term id="term2" />
    </section>
  );
}
