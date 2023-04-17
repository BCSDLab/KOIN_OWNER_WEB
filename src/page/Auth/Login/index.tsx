// import cn from 'utils/ts/className';
import useBooleanState from 'utils/hooks/useBooleanState';
import styles from './Login.module.scss';
import { ReactComponent as Logo } from '../../../assets/svg/common/koin-logo.svg';
import { ReactComponent as ShowIcon } from '../../../assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from '../../../assets/svg/auth/blind.svg';

export default function Login() {
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState();

  return (
    <div className={styles.template}>
      <div className={styles.contents}>
        <Logo className={styles.logo} />
        <div className={styles.form}>
          <div className={styles.form__container}>
            <input
              className={styles.form__input}
              type="text"
              placeholder="아이디 입력"
            />
          </div>
          <div className={styles.form__container}>
            <input
              className={styles.form__input}
              type={isBlind ? 'text' : 'password'}
              placeholder="비밀번호 입력"
            />
            <button
              type="button"
              className={styles.form__icon}
              onClick={changeIsBlind}
            >
              {isBlind ? <ShowIcon aria-hidden /> : <BlindIcon aria-hidden />}
            </button>
          </div>
          <div className={styles['auto-login']}>
            <input className={styles['auto-login__checkbox']} type="checkbox" />
            <div className={styles['auto-login__text']}>자동로그인</div>
          </div>
          <button className={styles.form__button} type="submit">로그인</button>
          <div className={styles.option}>
            <div className={styles.option__text}>아이디 찾기</div>
            <div className={styles.option__text}>비밀번호 찾기</div>
            <div className={styles.option__text}>회원가입</div>
          </div>
        </div>
      </div>
    </div>
  );
}
