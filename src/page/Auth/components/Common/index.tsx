import BackArrow from 'assets/svg/common/back-arrow.svg?react';
import { FormProvider, useForm } from 'react-hook-form';
import { Outlet, useLocation } from 'react-router-dom';
import { Register } from 'model/auth';
import { useStep } from 'page/Auth/hook/useStep';
import Done from 'page/Auth/components/Done';
import styles from './index.module.scss';

interface TopBarProps {
  previousStep: () => void;
  index: number;
  totalStep: number;
  currentStep: string;
}

export function TopBar({
  previousStep, index, totalStep, currentStep,
}: TopBarProps) {
  const location = useLocation();

  const isFindPassword = location.pathname.includes('find');
  const title = isFindPassword ? '비밀번호 찾기' : '회원가입';

  // eslint-disable-next-line
  const progressPercentage = (index + 1) / totalStep * 100;

  return (
    <div className={styles.topbar}>
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
      </div>
    </div>
  );
}

export default function CommonLayout() {
  const location = useLocation();
  const isFindPassword = location.pathname.includes('find');

  const method = useForm<Register>({
    mode: 'onChange',
    defaultValues: {
      company_number: '',
      name: '',
      password: '',
      passwordConfirm: '',
      phone_number: '',
      shop_id: null,
      shop_name: '',
      attachment_urls: [],
      verificationCode: '',
      shop_number: '',
    },
  });
  const steps = useStep(isFindPassword ? 'find' : 'register');
  const {
    isComplete,
  } = steps;

  return (
    <div className={styles.container}>
      <FormProvider {...method}>
        <div className={styles.content}>
          {isComplete
            ? <Done isFindPassword={isFindPassword} />
            : <Outlet context={steps} />}
        </div>
      </FormProvider>
    </div>
  );
}
