import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/className';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/blind.svg';
import { ReactComponent as LockIcon } from 'assets/svg/auth/lock.svg';
import { useLogin } from 'query/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginParams } from 'model/auth';
import { useState } from 'react';
import sha256 from 'utils/ts/SHA-256';
import { useErrorMessageStore } from 'store/errorMessageStore';
import styles from './Login.module.scss';
import OPTION from './static/option';

export default function Login() {
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState();
  const { value: isAutoLogin, changeValue: changeIsAutoLogin } = useBooleanState(true);
  const { isMobile } = useMediaQuery();
  const { login, isError: isServerError } = useLogin();
  const [isFormError, setIsFormError] = useState(false);
  const navigate = useNavigate();
  const { loginError } = useErrorMessageStore();

  const isError = isServerError || isFormError;

  const {
    register,
    handleSubmit,
  } = useForm<LoginParams>({
    resolver: zodResolver(LoginParams),
  });

  const onSubmit: SubmitHandler<LoginParams> = async (data) => {
    const hashedPassword = await sha256(data.password);
    login({ email: data.email, password: hashedPassword, isAutoLogin });
  };

  const onError = () => {
    setIsFormError(true);
  };

  return (
    <div className={styles.template}>
      <div className={styles.contents}>
        <Logo className={styles.logo} aria-hidden />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={styles.form__container}>
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isError,
              })}
              type="text"
              placeholder={isMobile ? '이메일' : '아이디 입력'}
              {...register('email')}
            />
          </div>
          <div className={styles.form__container}>
            <input
              className={cn({
                [styles.form__input]: true,
                [styles['form__input--error']]: isError,
              })}
              type={isBlind ? 'text' : 'password'}
              placeholder={isMobile ? '비밀번호' : '비밀번호 입력'}
              {...register('password')}
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
            {(isError || !!isFormError) && (
            <div className={styles['form__error-message']}>{loginError}</div>
            )}
            <label className={styles['form__auto-login__label']} htmlFor="auto-login">
              <input
                className={styles['form__auto-login__checkbox']}
                type="checkbox"
                id="auto-login"
                defaultChecked
                onChange={changeIsAutoLogin}
              />
              자동로그인
            </label>
          </div>
          <button
            className={cn({
              [styles.form__button]: true,
              [styles['form__button--login']]: true,
            })}
            type="submit"
          >
            로그인
          </button>
          {isMobile && (
            <button className={styles.form__button} type="button" onClick={() => navigate('/signup')}>
              회원가입
            </button>
          )}
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
