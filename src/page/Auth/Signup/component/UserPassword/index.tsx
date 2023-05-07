import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as VisibleImage } from 'assets/svg/auth/visible.svg';
import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import styles from './UserPassword.module.scss';

export default function UserPassword() {
  const { isMobile } = useMediaQuery();
  return (
    <div className={styles.form}>
      {!isMobile && <span className={styles.form__label}>비밀번호</span>}
      <div className={styles['form__input--wrapper']}>
        <input className={styles.form__input} placeholder={isMobile ? '비밀번호' : '비밀번호 입력 (필수)'} type="password" />
        {!isMobile && (
        <button className={styles['form__visible--button']} type="button">
          <VisibleImage />
        </button>
        )}
        <span className={styles.form__alert}>* 특수문자 포함 영어와 숫자 조합 6~18 자리</span>
      </div>
      <div className={styles['form__input--wrapper']}>
        <input className={styles.form__input} placeholder={isMobile ? '비밀번호' : '비밀번호 입력 (필수)'} type="password" />
        {!isMobile && (
        <button className={styles['form__visible--button']} type="button">
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
