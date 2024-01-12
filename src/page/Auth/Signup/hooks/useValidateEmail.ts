import { useForm } from 'react-hook-form';
import { User } from 'page/Auth/Signup/types/User';

const REG_EX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function useValidateEmail() {
  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    formState: { errors },
    watch,
  } = useForm<User>({ mode: 'onSubmit' });
  const emailDuplicateRegister = emailRegister('email', {
    required: { value: true, message: '이메일을 입력해주세요.' },
    pattern: {
      value: REG_EX,
      message: '유효한 이메일 주소를 입력해주세요.',
    },
  });

  return {
    emailHandleSubmit, errors, emailDuplicateRegister, watch,
  };
}
