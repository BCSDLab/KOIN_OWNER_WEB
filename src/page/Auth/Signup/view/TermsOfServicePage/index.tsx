import { Link } from 'react-router-dom';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import TERMS from 'page/Auth/Signup/constant/terms';
import React, { useEffect, useRef, useState } from 'react';

import styles from './TermsOfService.module.scss';

type ButtonClickEventProps = {
  clickEvent: () => void;
  termsRef: React.RefObject<HTMLDivElement>
};
const useTermCheck = (ref:React.RefObject<HTMLDivElement>) => {
  const [isUserTermAgree, setUserTermAgree] = useState(false);
  const [isKoinTermAgree, setKoinTermAgree] = useState(false);
  const [isAllAgree, setAllAgree] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const checkAll = () => {
    if (isAllAgree) {
      setUserTermAgree(false);
      setKoinTermAgree(false);
    } else {
      setUserTermAgree(true);
      setKoinTermAgree(true);
    }
  };
  useEffect(() => {
    setAllAgree(isKoinTermAgree && isUserTermAgree);
  }, [isKoinTermAgree, isUserTermAgree]);
  useEffect(() => {
    if (isAllAgree && ref.current) {
      console.log(
        ref.current.scrollHeight,
        ref.current.scrollTop,
      );
      ref.current.scrollTo({ top: ref.current.scrollHeight });
      console.log(
        ref.current.scrollHeight,
        ref.current.scrollTop,
      );
    }
  }, [isAllAgree, ref]);
  return {
    isUserTermAgree,
    setUserTermAgree,
    isKoinTermAgree,
    setKoinTermAgree,
    isAllAgree,
    checkAll,
    sectionRef,
  };
};

export default function TermsOfService({ clickEvent, termsRef }:ButtonClickEventProps) {
  const { isMobile } = useMediaQuery();
  const USER_TERM = TERMS[0];
  const KOIN_TERM = TERMS[1];
  const {
    isUserTermAgree, setUserTermAgree, isKoinTermAgree, setKoinTermAgree, isAllAgree, checkAll,
  } = useTermCheck(termsRef);
  return (
    <>
      <section className={styles.section} ref={termsRef}>
        <div className={styles['agree-all']}>
          <label htmlFor="terms" className={styles['agree-all__content']}>
            <input id="terms" type="checkbox" className={styles.section__checkbox} checked={isAllAgree} onChange={checkAll} />
            <span className={styles['agree-all__pc--phrase']}>아래 이용약관에&nbsp;</span>
            모두 동의합니다.
          </label>
        </div>
        <div className={styles.term}>
          <span className={styles.term__title}>{USER_TERM.title}</span>
          <div className={styles.term__content}>
            {USER_TERM.text}
          </div>
          <label htmlFor={USER_TERM.id} className={styles.term__agree}>
            <input id={USER_TERM.id} type="checkbox" className={styles.term__agree__checkbox} checked={isUserTermAgree} onChange={() => setUserTermAgree(!isUserTermAgree)} />
            <span className={styles['term__agree__phrase--mobile']}>{`${USER_TERM.title}(필수)`}</span>
            <span className={styles['term__agree__phrase--pc']}>{`${USER_TERM.title}에 동의합니다`}</span>
          </label>
        </div>
        <div className={styles.term}>
          <span className={styles.term__title}>{KOIN_TERM.title}</span>
          <div className={styles.term__content}>
            {KOIN_TERM.text}
          </div>
          <label htmlFor={KOIN_TERM.id} className={styles.term__agree}>
            <input id={KOIN_TERM.id} type="checkbox" className={styles.term__agree__checkbox} checked={isKoinTermAgree} onChange={() => setKoinTermAgree(!isKoinTermAgree)} />
            <span className={styles['term__agree__phrase--mobile']}>{`${KOIN_TERM.title}(필수)`}</span>
            <span className={styles['term__agree__phrase--pc']}>{`${KOIN_TERM.title}에 동의합니다`}</span>
          </label>
        </div>
      </section>

      <div className={styles.buttons}>
        {isMobile ? (
          <>
            <Link to="/login" className={styles['buttons__mobile-button']}>취소</Link>
            <CustomButton buttonSize="mobile" content="확인" onClick={clickEvent} disable={!isAllAgree} />
          </>
        )
          : <CustomButton buttonSize="large" content="다음" onClick={clickEvent} disable={!isAllAgree} />}
      </div>
    </>
  );
}
