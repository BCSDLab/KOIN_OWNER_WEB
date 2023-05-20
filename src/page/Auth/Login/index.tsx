import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/className';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/blind.svg';
import { ReactComponent as LockIcon } from 'assets/svg/auth/lock.svg';
import useLogin from 'query/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from 'api/auth/model';
import styles from './Login.module.scss';
import OPTION from './static/option';

export default function Login() {
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState();
  const { isMobile } = useMediaQuery();
  const { mutate, isError } = useLogin();

  const {
    register,
    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
    mutate({ email: data.email, password: data.password });
  };

  return (
    <div className={styles.template}>
      <div className={styles.contents}>
        <Logo className={styles.logo} aria-hidden />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form__container}>
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isError,
              })}
              type="text"
              {...register('email', { required: true })}
              placeholder={isMobile ? '이메일' : '아이디 입력'}
            />
          </div>
          <div className={styles.form__container}>
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isError,
              })}
              type={isBlind ? 'text' : 'password'}
              {...register('password', { required: true })}
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
          <div className={styles['form__auto-login']}>
            {isError && (
            <div className={styles['form__error-message']}>아이디 또는 비밀번호를 잘못 입력했습니다</div>
            )}
            <label className={styles['form__auto-login__label']} htmlFor="auto-login">
              <input className={styles['form__auto-login__checkbox']} type="checkbox" id="auto-login" />
              자동로그인
            </label>
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
                <Link to={OPTION[1].path} className={styles.option__link}>
                  <LockIcon aria-hidden />
                  {/* 비밀번호 찾기 */}
                  {OPTION[1].name}
                </Link>
              )
              : OPTION.map((option) => (
                <Link to={option.path} key={option.name} className={styles.option__link}>
                  {option.name}
                </Link>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}
