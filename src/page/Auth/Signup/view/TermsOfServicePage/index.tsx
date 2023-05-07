import Term from 'page/Auth/Signup/component/Term';
import { Link } from 'react-router-dom';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './TermsOfService.module.scss';

type ButtonClickEvent = {
  clickEvent: () => void;
};

export default function TermsOfService({ clickEvent }:ButtonClickEvent) {
  const { isMobile } = useMediaQuery();
  return (
    <>
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
      {isMobile && (
        <div className={styles.buttons}>
          <Link to="/login" className={styles['buttons__mobile-button']}>취소</Link>
          <CustomButton type="mobile" content="확인" onClick={() => clickEvent()} />
        </div>
      )}
    </>
  );
}
