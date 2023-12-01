import { useForm } from 'react-hook-form';
import { OwnerData } from 'page/Auth/Signup/types/OwnerData';

export default function useCheckOwnerData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<OwnerData>({ mode: 'onSubmit' });
  const ownerNameRegister = register('ownerName', {
    required: { value: true, message: '대표자명을 입력해주세요.' },
  });
  const shopNameNameRegister = register('shopName', {
    required: { value: true, message: '가게명을 입력해주세요.' },
  });
  const registrationNumberFrontRegister = register('registrationNumberFront', {
    required: { value: true, message: '등록번호를 입력해주세요.' },
  });
  const registrationNumberMiddleRegister = register('registrationNumberMiddle', {
    required: { value: true, message: '등록번호를 입력해주세요.' },
  });
  const registrationNumberEndRegister = register('registrationNumberEnd', {
    required: { value: true, message: '등록번호를 입력해주세요.' },
  });
  const phoneFrontRegister = register('phoneFront', {
    required: { value: true, message: '대표자 번호를 입력해주세요.' },
  });
  const phoneMiddleRegister = register('phoneMiddle', {
    required: { value: true, message: '대표자 번호를 입력해주세요.' },
  });
  const phoneEndRegister = register('phoneEnd', {
    required: { value: true, message: '대표자 번호를 입력해주세요.' },
  });
  const fileRegister = register('registerFiles', {
    required: { value: true, message: '등록번호를 입력해주세요.' },
  });
  return {
    ownerNameRegister,
    shopNameNameRegister,
    registrationNumberFrontRegister,
    registrationNumberMiddleRegister,
    registrationNumberEndRegister,
    phoneFrontRegister,
    phoneMiddleRegister,
    phoneEndRegister,
    fileRegister,
    errors,
    watch,
    handleSubmit,
    setValue,
  };
}
