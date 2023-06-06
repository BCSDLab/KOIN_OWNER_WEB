/* eslint-disable import/no-extraneous-dependencies */
import { useForm } from 'react-hook-form';

const REG_EX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

type EmailForm = {
  email:string
};

export default function useEmailDuplicateCheck() {
  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    formState: { errors },
  } = useForm<EmailForm>();
  const emailDuplicateRegister = emailRegister('email', {
    required: { value: true, message: '이메일을 입력해주세요.' },
    pattern: {
      value: REG_EX,
      message: '유효한 이메일 주소를 입력해주세요.',
    },
  });
  return {
    emailHandleSubmit, errors, emailDuplicateRegister,
  };
}
