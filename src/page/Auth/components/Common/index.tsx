import BackArrow from 'assets/svg/common/back-arrow.svg?react';
import { FormProvider, useForm, UseFormSetError } from 'react-hook-form';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import cn from 'utils/ts/className';
import { Register, RegisterUser } from 'model/auth';
import { changePassword } from 'api/auth';
import { phoneRegisterUser } from 'api/register';
import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { useStep } from 'page/Auth/hook/useStep';
import sha256 from 'utils/ts/SHA-256';
import { useDebounce } from 'utils/hooks/useDebounce';
import ROUTES from 'static/routes';
import Done from 'page/Auth/components/Done';
import styles from './index.module.scss';

const setNewPassword = async (
  phone_number: string,
  password: string,
  setError: UseFormSetError<Register>,
) => {
  const hashPassword = await sha256(password);
  changePassword({ phone_number, password: hashPassword })
    .catch((e) => {
      if (isKoinError(e)) {
        setError('password', { type: 'custom', message: e.message });
      } else {
        sendClientError(e);
      }
    });
};

interface RegisterParam {
  company_number: string,
  name: string,
  password: string,
  phone_number: string,
  shop_id: number | null,
  shop_name: string,
  attachment_urls: { file_url: string; }[],
  setError: UseFormSetError<RegisterUser>,
}

const registerUser = (
  {
    company_number,
    name,
    password,
    phone_number,
    shop_id,
    shop_name,
    attachment_urls,
    setError,
  }: RegisterParam,
) => {
  phoneRegisterUser({
    company_number, name, password, phone_number, shop_id, shop_name, attachment_urls,
  }).then(() => sessionStorage.removeItem('accessToken'))
    .catch((e) => {
      if (isKoinError(e)) {
        setError('password', { type: 'custom', message: e.message });
      } else {
        sendClientError(e);
      }
    });
};

export default function CommonLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isFindPassword = location.pathname.includes('find');
  const title = isFindPassword ? '비밀번호 찾기' : '회원가입';

  const method = useForm<Register>({
    mode: 'onChange',
  });
  const {
    formState: { errors }, setError, getValues,
  } = method;

  const steps = useStep(isFindPassword ? 'find' : 'register');
  const {
    nextStep,
    previousStep,
    currentStep,
    index,
    totalStep,
    isComplete,
    isStepComplete,
    isSearch,
    setIsSearch,
  } = steps;

  // eslint-disable-next-line
  const progressPercentage = (index + 1) / totalStep * 100;

  const stepCheck = async () => {
    if (isComplete) navigate(ROUTES.Login());
    if (!errors.root) {
      if (index + 1 === totalStep && isFindPassword) {
        setNewPassword(getValues('phone_number'), getValues('password'), setError);
      } else if (index + 1 === totalStep && !isFindPassword) {
        const hash = await sha256(getValues('password'));
        registerUser(
          {
            company_number: getValues('company_number'),
            name: getValues('name'),
            password: hash,
            phone_number: getValues('phone_number'),
            shop_id: getValues('shop_id'),
            shop_name: getValues('shop_name'),
            attachment_urls: getValues('attachment_urls'),
            setError,
          },
        );
      }
      nextStep();
    }
  };

  const debounce = useDebounce<null>(stepCheck, null);

  const handleSelectComplete = () => {
    setIsSearch(false);
    steps.setIsStepComplete(true);
  };

  return (
    <div className={styles.container}>
      <FormProvider {...method}>
        <div className={styles.top}>
          <BackArrow className={styles.top__back} onClick={previousStep} />
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.step}>
          <div className={styles.step__progress}>
            <div>
              <span>
                {index + 1}
                .
                {' '}
              </span>
              {currentStep}
            </div>
            <div>
              {`${index + 1}/${totalStep}`}
            </div>
          </div>
          <div className={styles['step-container']}>
            <hr className={styles['progress-bar']} />
            <hr style={{
              width: `${progressPercentage}%`,
              backgroundColor: '#175C8E',
              position: 'absolute',
              top: '0',
              left: '0',
              height: '3px',
              border: 'none',
            }}
            />
          </div>
          <div className={styles.content}>
            {isComplete
              ? <Done isFindPassword={isFindPassword} />
              : <Outlet context={steps} />}
          </div>
          {!isComplete && !isSearch && (
            <button
              type="button"
              onClick={debounce}
              disabled={!isStepComplete}
              className={
                cn({
                  [styles['button--active']]: isStepComplete,
                  [styles.button]: true,
                })
              }
            >
              {index + 1 === totalStep ? '완료' : '다음'}
            </button>
          )}
          {isSearch && (
            <button
              type="button"
              onClick={handleSelectComplete}
              disabled={!steps.isShopSelect}
              className={
                cn({
                  [styles['button--active']]: steps.isShopSelect,
                  [styles.button]: true,
                })
              }
            >
              선택완료
            </button>
          )}
        </div>
      </FormProvider>
    </div>
  );
}
