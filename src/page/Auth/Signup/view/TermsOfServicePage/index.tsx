import { Link } from 'react-router-dom';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import Terms from 'page/Auth/Signup/constant/terms';
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
        {Terms.map((term) => (
          <div className={styles.term} key={term.id}>
            <span className={styles.term__title}>{term.title}</span>
            <div className={styles.term__content}>
              {term.text}
            </div>
            <label htmlFor={term.id} className={styles.term__agree}>
              <input id={term.id} type="checkbox" className={styles.term__agree__checkbox} />
              <span className={styles['term__agree__phrase--mobile']}>개인정보 이용약관(필수)</span>
              <span className={styles['term__agree__phrase--pc']}>{`${term.title}에 동의합니다`}</span>
            </label>
          </div>
        ))}
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
