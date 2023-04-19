// import cn from 'utils/ts/className';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/className';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './Login.module.scss';
import { ReactComponent as Logo } from '../../../assets/svg/common/koin-logo.svg';
import { ReactComponent as ShowIcon } from '../../../assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from '../../../assets/svg/auth/blind.svg';
import { ReactComponent as LockIcon } from '../../../assets/svg/auth/lock.svg';
import OPTION from './static/option';

export default function Login() {
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState();
  const { isMobile } = useMediaQuery();

  return (
    <div className={styles.template}>
      <div className={styles.contents}>
        <Logo className={styles.logo} />
        <div className={styles.form}>
          <div className={styles.form__container}>
            <input
              className={styles.form__input}
              type="text"
              placeholder={isMobile ? '이메일' : '아이디 입력'}
            />
          </div>
          <div className={styles.form__container}>
            <input
              className={styles.form__input}
              type={isBlind ? 'text' : 'password'}
              placeholder={isMobile ? '비밀번호' : '비밀번호 입력'}
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
          <button
            className={cn({
              [styles.form__button]: true,
              [styles['form__button--mobile']]: true,
            })}
            type="submit"
          >
            로그인
          </button>
          { isMobile
            ? (
              <button className={styles.form__button} type="button">
                회원가입
              </button>
            ) : null}
          <div className={styles.option}>
            {isMobile
              ? (
                <>
                  <LockIcon aria-hidden />
                  <div className={styles.option__text}>{OPTION[1].name}</div>
                </>
              )
              : OPTION.map((option) => (
                <div className={styles.option__text}>{option.name}</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
