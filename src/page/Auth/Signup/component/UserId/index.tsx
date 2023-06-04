import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { useState } from 'react';
import styles from './UserId.module.scss';

export default function UserId() {
  const { isMobile } = useMediaQuery();
  const [isUsable, setUsable] = useState<boolean | null>(null);
  return (
    !isMobile
      ? (
        <div className={styles.form}>
          <span className={styles.form__label}>아이디</span>
          <div className={styles['input-block']}>
            <input className={styles['input-block__input']} id="id-input" placeholder="이메일 형식 아이디 입력(필수)" />
            <CustomButton content="중복확인" buttonType="small" onClick={() => { setUsable(true); }} />
          </div>
          { isUsable !== null
            && (
            <>
              {isUsable && <span className={styles.form__alert}>사용하실 수 있는 아이디 입니다.</span>}
              {!isUsable && <span className={styles['form__warn--phrase']}>이미 가입된 이메일입니다.</span>}
            </>
            )}
        </div>
      )
      : (
        <div className={styles['input-block']}>
          <div className={styles['input-block__input-elements']}>
            <input className={styles[`${(isUsable !== null) ? 'input-block__input' : 'input-block__input--warn'}`]} id="id-input" placeholder="이메일" />
            <CustomButton content="중복확인" buttonType="small" onClick={() => { setUsable(true); }} />
          </div>
          <div className={styles.form__warn}>
            { isUsable !== null
            && (
            <>
              {isUsable && <span className={styles.form__alert}>사용하실 수 있는 아이디 입니다.</span>}
              {!isUsable && (
              <>
                <Warn />
                <span className={styles['form__warn--phrase']}>이미 가입된 이메일입니다.</span>
              </>
              )}
            </>
            )}
          </div>
        </div>
      )
  );
}
