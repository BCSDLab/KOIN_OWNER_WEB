import { ReactComponent as BackArrow } from 'assets/svg/common/back-arrow.svg';
import { FormProvider, useForm, UseFormSetError } from 'react-hook-form';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import cn from 'utils/ts/className';
import { Register } from 'model/auth';
// eslint-disable-next-line
import { changePassword } from 'api/auth';
import { isKoinError } from '@bcsdlab/koin';
import { useStep } from 'page/Auth/hook/useStep';
// eslint-disable-next-line
import Done from '../Done/index';
import styles from './index.module.scss';

const setNewPassword = (
  phone_number: string,
  password: string,
  setError: UseFormSetError<Register>,
) => {
  changePassword({ phone_number, password })
    .then(() => sessionStorage.removeItem('accessToken'))
    .catch((e) => {
      if (isKoinError(e)) {
        setError('password', { type: 'custom', message: e.message });
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
  const { formState: { errors }, setError, getValues } = method;

  const steps = useStep(isFindPassword ? 'find' : 'register');
  const {
    nextStep, previousStep, currentStep, index, totalStep, isComplete, isStepComplete,
  } = steps;

  // eslint-disable-next-line
  const progressPercentage = (index + 1) / totalStep * 100;

  // form에 error가 없으면 다음 단계로 넘어감
  const stepCheck = () => {
    if (isComplete) navigate('/login');
    if (!errors.root) {
      if (index + 1 === totalStep && isFindPassword) setNewPassword(getValues('phone_number'), getValues('password'), setError);
      nextStep();
    }
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
            {isComplete ? <Done isFindPassword={isFindPassword} /> : <Outlet context={steps} />}
          </div>
          <button
            type="button"
            onClick={stepCheck}
            disabled={!isStepComplete}
            className={
              cn({
                [styles['button--active']]: isStepComplete || isComplete,
                [styles.button]: true,
              })
            }
          >
            {!isComplete
              ? <div>{!isComplete && (index + 1 === totalStep) ? '완료' : '다음'}</div>
              : '로그인 화면 바로 가기'}
          </button>
        </div>
      </FormProvider>
    </div>
  );
}
