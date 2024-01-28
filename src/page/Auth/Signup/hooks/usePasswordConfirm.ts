import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useRegisterInfo from 'store/registerStore';

const REG_EX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$/i;

type PasswordForm = {
  password: string,
  passwordConfirm:string
};

export default function usePasswordConfirm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    clearErrors,
  } = useForm<PasswordForm>();
  const { userInfo: userData, setUserInfo: setPassword } = useRegisterInfo();

  const passwordRegister = register('password', {
    required: { value: true, message: '비밀번호를 입력해주세요.' },
    pattern: {
      value: REG_EX,
      message: '특수문자 포함 영어와 숫자 조합 6~18 자리를 입력해주세요',
    },
  });
  const passwordValue = watch('password');

  const passwordConfirmRegister = register('passwordConfirm', {
    required: { value: true, message: '비밀번호 확인을 입력해주세요.' },
    validate: (password) => password === watch('password') || '비밀번호가 일치하지 않습니다',
  });
  const passwordConfirmValue = watch('passwordConfirm');

  useEffect(() => {
    if (passwordValue !== passwordConfirmValue) {
      setError('passwordConfirm', {
        message: '비밀번호가 일치하지 않습니다.',
      });
      if (userData.password) {
        const { password, ...info } = userData;
        setPassword(info);
      }
    } else {
      clearErrors('passwordConfirm');
    }
  }, [clearErrors, passwordConfirmValue, passwordValue, setError, setPassword, userData, watch]);
  return {
    passwordRegister, errors, passwordConfirmRegister, handleSubmit,
  };
}
