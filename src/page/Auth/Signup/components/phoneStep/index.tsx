import {
  useFormContext, UseFormGetValues, UseFormSetError,
} from 'react-hook-form';
import {
  useState, ChangeEvent, useEffect,
} from 'react';
import { verificationAuthCode, getPhoneAuthCode } from 'api/register';
import { isKoinError, sendClientError } from '@bcsdlab/koin';
import { PhoneNumberRegisterParam } from 'model/register';
import showToast from 'utils/ts/showToast';
import {
  Button, Input, Title, ValidationMessage,
} from 'page/Auth/components/Common/form';
import { useMutation } from '@tanstack/react-query';
import BlindButton from 'page/Auth/components/Common/BlindButton';
import { Register } from 'model/auth';
import { Link } from 'react-router-dom';
import ROUTES from 'static/routes';
import styles from './phoneStep.module.scss';

interface SendCodeParams {
  getValues: UseFormGetValues<Register>;
  onError: (e: unknown) => void;
  onSucess?: () => void;
  onClick?: () => void;
}

interface TimerProps {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  time?: number;
  timeOut?: () => void;
  onMid?: () => void;
  stop?: boolean;
}

const useSendCode = ({
  getValues, onError, onSucess, onClick,
}: SendCodeParams) => {
  if (onClick) onClick();
  const phoneNumber = getValues('phone_number');
  const phoneNumberParam: PhoneNumberRegisterParam = { phone_number: phoneNumber };
  const sendCode = useMutation({
    mutationKey: ['sendCode'],
    mutationFn: () => getPhoneAuthCode(phoneNumberParam),
    onError: (e) => onError(e),
    onSuccess: () => {
      if (onSucess) onSucess();
      showToast('success', '인증번호를 발송했습니다');
    },
  });

  return sendCode;
};

const useCheckCode = (
  verificationCode: string,
  phoneNumber: string,
  setError: UseFormSetError<Register>,
) => {
  const [isCertified, setIsCertified] = useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: () => verificationAuthCode({
      certification_code: verificationCode,
      phone_number: phoneNumber,
    }),
    onError: (e) => {
      if (isKoinError(e)) {
        setError('verificationCode', { type: 'error', message: e.message });
      } else {
        sendClientError(e);
      }
    },
    onSuccess: (res) => {
      sessionStorage.setItem('access_token', res.token);
      setIsCertified(true);
    },
  });

  return { mutation, isCertified };
};

function Timer({
  seconds, setSeconds, time = 180, timeOut, onMid, stop,
}: TimerProps) {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (seconds <= 0 && timeOut) {
      timeOut();
    }

    if (seconds === time - 30 && onMid) {
      // 30초 지났을 때
      onMid();
    }

    if (seconds > 0 && !stop) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds, setSeconds, timeOut, time, onMid, stop]);

  return (
    <div>
      {seconds / 60 >= 10 ? Math.floor(seconds / 60) : `0${Math.floor(seconds / 60)}`}
      {' : '}
      {seconds % 60 >= 10 ? seconds % 60 : `0${seconds % 60}`}
    </div>
  );
}

interface InquiryButtonProps {
  title: string;
  link: string;
}

function InquiryButton({ title, link }:InquiryButtonProps) {
  return (
    <div className={styles.inquiry}>
      <div className={styles.inquiry__quote}>{title}</div>
      <a
        className={styles.inquiry__link}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        문의하기
      </a>
    </div>
  );
}

function PhoneStep({ nextStep }: { nextStep: () => void }) {
  const {
    register, formState: { errors }, getValues, setError, watch, setValue, clearErrors,
  } = useFormContext<Register>();

  const [steps, setSteps] = useState(0);
  const [isShowInquiry, setIsShowInquiry] = useState(false);
  const [seconds, setSeconds] = useState(180);
  const [hasConfilct, setHasConflict] = useState(false);
  const [phoneNumber, verificationCode] = watch(['phone_number', 'verificationCode']);
  const onSendCodeSucess = () => {
    setSteps((prev) => prev + 1);
    setHasConflict(false);
  };
  const onSendCodeError = (e: unknown) => {
    if (isKoinError(e)) {
      if (e.status === 409) {
        setError('phone_number', { type: 'custom', message: '이미 가입된 전화번호입니다.' });
        setHasConflict(true);
        return;
      }
      setError('phone_number', { type: 'custom', message: e.message });
    }
  };

  const onRevalidateCodeSuccess = () => {
    setSeconds(180);
    clearErrors();
  };

  const sendCode = useSendCode({
    getValues, onError: onSendCodeError, onSucess: onSendCodeSucess,
  });

  const revalidataCode = useSendCode({
    getValues, onError: onSendCodeError, onSucess: onRevalidateCodeSuccess,
  });

  const { mutation, isCertified } = useCheckCode(
    verificationCode,
    phoneNumber,
    setError,
  );

  const setCode = (e: ChangeEvent<HTMLInputElement>) => setValue('verificationCode', e.target.value);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    setValue('phone_number', value);
    clearErrors();
  };

  useEffect(() => {
    if (verificationCode.length === 6 && mutation.isIdle && sendCode.isSuccess) {
      mutation.mutate();
    }
  }, [verificationCode, mutation, sendCode]);

  return (
    <div className={styles['default-info']}>
      <div>
        {steps >= 0 && (
        <div className={styles['phone-number']}>
          <Title title="휴대 전화 번호를 입력해주세요" />
          <Input
            register={register}
            name="phone_number"
            required
            requiredMessage="올바른 번호가 아닙니다. 다시 입력해주세요."
            pattern={/^\d{11}$/}
            patternMessage="숫자만 입력 가능합니다"
            onChange={handlePhoneNumberChange}
            placeholder="-없이 번호를 입력해주세요."
            inputMode="numeric"
          />
          <div className={styles.wrapper}>
            <ValidationMessage
              message={errors.phone_number?.message}
              isError={!!errors.phone_number}
            />
            {hasConfilct && (
            <Link to={ROUTES.Login()}>
              <div className={styles['login-link']}>
                로그인 하기
              </div>
            </Link>
            )}
          </div>
          <Button
            disabled={!!errors.phone_number?.message
              || phoneNumber.length !== 11
              || steps !== 0
               || sendCode.isPending}
            onClick={sendCode.mutate}
          >
            인증번호 발송
          </Button>
          {hasConfilct && (
          <InquiryButton
            title="해당 번호로 가입한 적 없으신가요?"
            link="https://open.kakao.com/o/sgiYx4Qg"
          />
          )}
        </div>
        )}

        {steps >= 1 && (
        <div className={`${styles['verification-code']} ${styles['input-box']}`}>
          <Title title="발송된 인증 번호를 입력해주세요." />
          <Input
            register={register}
            name="verificationCode"
            required
            requiredMessage="인증번호를 입력해주세요"
            pattern={/^[0-9]{6}$/}
            patternMessage="인증번호는 6자리입니다."
            onChange={setCode}
            placeholder="인증번호를 입력해주세요."
            inputMode="numeric"
            component={(
              <Timer
                seconds={seconds}
                setSeconds={setSeconds}
                timeOut={() => setError('verificationCode', { type: 'error', message: '유효시간이 지났습니다. 인증번호를 재발송 해주세요.' })}
                onMid={() => setIsShowInquiry(true)}
                stop={isCertified}
              />
)}
          />
          <ValidationMessage
            message={isCertified ? '인증번호가 일치합니다. 다음으로 넘어가주세요.' : errors.verificationCode?.message}
            isError={!!errors.verificationCode}
          />
          {!isCertified && (
          <>
            <Button onClick={revalidataCode.mutate}>
              인증번호 재발송
            </Button>
            {isShowInquiry && (
              <InquiryButton
                title="인증번호 재발송이 안 되시나요?"
                link="https://open.kakao.com/o/sgiYx4Qg"
              />
            )}
          </>
          )}
        </div>
        )}
      </div>

      <Button
        disabled={!isCertified}
        onClick={() => {
          setValue('verificationCode', '');
          nextStep();
        }}
      >
        다음
      </Button>
    </div>
  );
}

interface Props {
  nextStep: () => void;
}

interface PasswordParams {
  password: string;
  passwordConfirm: string;
}

function PasswordStep({ nextStep }: Props) {
  const {
    register, formState: { errors }, watch,
  } = useFormContext<PasswordParams>();

  const [isBlind, setIsBlind] = useState({
    password: false,
    passwordConfirm: false,
  });

  const toggleBlindState = (key: 'password' | 'passwordConfirm') => {
    setIsBlind((prev) => ({
      ...prev, [key]: !prev[key],
    }));
  };

  const [password, passwordConfirm] = watch(['password', 'passwordConfirm']);

  const isValidPassword = password.length >= 6 && !errors.password;
  return (
    <div className={styles['default-info']}>
      <div>
        <Title title={isValidPassword ? '비밀번호를 한 번 더 입력해주세요.' : '사용하실 비밀번호를 입력해주세요.'} />
        <Input
          name="password"
          register={register}
          required
          requiredMessage="비밀번호를 입력해주세요."
          pattern={/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/}
          patternMessage="특수문자 포함 영어와 숫자 6~18 자리로 입력해주세요."
          type={isBlind.password ? 'text' : 'password'}
          placeholder="특수문자 포함 영어와 숫자 6~18 자리로 입력해주세요."
          component={<BlindButton isBlind={!isBlind.password} onClick={() => toggleBlindState('password')} />}
        />
        <ValidationMessage
          message={password.length >= 6 && !errors.password ? '사용 가능한 비밀번호입니다.' : errors.password?.message}
          isError={!!errors.password}
        />
        <Input
          name="passwordConfirm"
          register={register}
          required
          requiredMessage="비밀번호를 확인해주세요."
          pattern={/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/}
          patternMessage="특수문자 포함 영어와 숫자 6~18 자리로 입력해주세요."
          type={isBlind.passwordConfirm ? 'text' : 'password'}
          placeholder="비밀번호를 다시 입력해주세요."
          component={<BlindButton isBlind={!isBlind.passwordConfirm} onClick={() => toggleBlindState('passwordConfirm')} />}
        />
        <ValidationMessage
          message={password.length >= 6 && password === passwordConfirm && !errors.passwordConfirm ? '비밀번호가 일치합니다. 다음으로 넘어가주세요.' : errors.passwordConfirm?.message}
          isError={!!errors.passwordConfirm}
        />
      </div>
      <Button
        disabled={password !== passwordConfirm
          || !!errors.password
          || !!errors.passwordConfirm
          || password.length < 6}
        onClick={nextStep}
      >
        다음
      </Button>
    </div>
  );
}

export default function AuthenticationStep({ nextStep }: Props) {
  const [steps, setSteps] = useState(0);

  if (steps === 0) {
    return (
      <PhoneStep nextStep={() => setSteps((prev) => prev + 1)} />
    );
  }

  return <PasswordStep nextStep={nextStep} />;
}
