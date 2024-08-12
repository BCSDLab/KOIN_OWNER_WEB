import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/className';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as ShowIcon } from 'assets/svg/auth/show.svg';
import { ReactComponent as BlindIcon } from 'assets/svg/auth/blind.svg';
import { ReactComponent as LockIcon } from 'assets/svg/auth/lock.svg';
import { useLogin } from 'query/auth';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginParams } from 'model/auth';
import { useState } from 'react';
import sha256 from 'utils/ts/SHA-256';
import { useErrorMessageStore } from 'store/errorMessageStore';
import ROUTES from 'static/routes';
import styles from './Login.module.scss';
import OPTION from './static/option';
import ApprovalModal from './ApprovalModal';

export default function Login() {
  const { value: isBlind, changeValue: changeIsBlind } = useBooleanState();
  const { value: isAutoLogin, changeValue: changeIsAutoLogin } = useBooleanState(true);
  const { isMobile } = useMediaQuery();
  const { login, isError: isServerError } = useLogin();
  const [isFormError, setIsFormError] = useState(false);
  const navigate = useNavigate();
  const { loginError, setLoginError, loginErrorStatus } = useErrorMessageStore();
  const [emailError, setEmailError] = useState('');
  const isError = isServerError || isFormError;

  const {
    register,
    handleSubmit,
  } = useForm<LoginParams>({
    resolver: zodResolver(LoginParams),
  });

  const onSubmit: SubmitHandler<LoginParams> = async (data) => {
    if (data.account === '') {
      setLoginError('전화번호를 입력해주세요.');
      setIsFormError(true);
      return;
    }
    if (data.password === '') {
      setLoginError('비밀번호를 입력해주세요.');
      setIsFormError(true);
      return;
    }
    if (!/^[0-9]*$/.test(data.account)) {
      setLoginError('올바른 전화번호 형식이 아닙니다.');
      setIsFormError(true);
      return;
    }
    const hashedPassword = await sha256(data.password);
    login({ account: data.account, password: hashedPassword, isAutoLogin });
  };

  const onError = (error: FieldErrors<LoginParams>) => {
    setIsFormError(true);
    if (error.account) {
      setEmailError(error.account?.message || '');
    }
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
              placeholder={isMobile ? '휴대폰번호' : '휴대폰 번호를 입력하세요'}
              {...register('account')}
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
              autoComplete="new-password"
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
              <div className={styles['form__error-message']}>{loginError || emailError}</div>
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
          <div className={styles.form__error}>
            {isMobile && (isError || !!isFormError) && (
              <div className={styles['form__error-message']}>{loginError || emailError}</div>
            )}
          </div>
          <button
            className={cn({
              [styles.form__button]: true,
              [styles['form__button--login']]: true,
            })}
            type="submit"
          // onClick={toggle}
          >
            로그인
          </button>
          {isMobile && (
            <button className={styles.form__button} type="button" onClick={() => navigate(ROUTES.Signup)}>
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
              : OPTION.filter((option) => option.name !== '아이디 찾기').map((option) => (
                <Link to={option.path} key={option.name} className={styles.option__link}>
                  {option.name}
                </Link>
              ))}
          </div>
        </form>
      </div>
      {loginErrorStatus === 403 && <ApprovalModal />}
    </div>
  );
}
