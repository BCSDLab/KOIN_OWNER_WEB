import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as VisibleImage } from 'assets/svg/auth/visible.svg';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import { useRef } from 'react';
import styles from './UserPassword.module.scss';

const useVisible = () => {
  const visibility = useRef<HTMLInputElement>(null);
  const setVisible = () => {
    if (visibility.current) {
      if (visibility.current.type === 'password') {
        visibility.current.type = 'text';
      } else {
        visibility.current.type = 'password';
      }
    }
  };
  return { visibility, setVisible };
};

export default function UserPassword() {
  const { isMobile } = useMediaQuery();
  const { visibility: passwordVisibility, setVisible: setPasswordVisibility } = useVisible();
  const { visibility: checkVisibility, setVisible: setCheckVisibility } = useVisible();
  return (
    <div className={styles.form}>
      {!isMobile && <span className={styles.form__label}>비밀번호</span>}
      <div className={styles.form__input}>
        <input className={styles.input} placeholder={isMobile ? '비밀번호' : '비밀번호 입력 (필수)'} type="password" ref={passwordVisibility} />
        {!isMobile && (
        <button className={styles['form__visible--button']} type="button" onClick={setPasswordVisibility}>
          <VisibleImage />
        </button>
        )}
        <span className={styles.form__alert}>* 특수문자 포함 영어와 숫자 조합 6~18 자리</span>
      </div>
      <div className={styles.form__input}>
        <input className={styles.input} placeholder={isMobile ? '비밀번호' : '비밀번호 입력 (필수)'} type="password" ref={checkVisibility} />
        {!isMobile && (
        <button className={styles['form__visible--button']} type="button" onClick={setCheckVisibility}>
          <VisibleImage />
        </button>
        )}
        <div className={styles.form__warn}>
          <Warn />
          <span className={styles['form__warn--phrase']}>비밀번호가 일치하지 않습니다.</span>
        </div>
      </div>
    </div>
  );
}
