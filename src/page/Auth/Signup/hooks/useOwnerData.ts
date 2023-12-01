import { useForm } from 'react-hook-form';
import { OwnerData } from 'page/Auth/Signup/types/OwnerData';
import useModalStore from 'store/modalStore';
import { useEffect } from 'react';

const VALIDATIONMESSAGE = {
  owerName: '대표자명을 입력해주세요',
  shopName: '가게명을 입력해주세요',
  registraionNumber: '사업자 등록번호를 입력해주세요',
  phoneNumber: '대표자 연락처를 입력해주세요',
  file: '파일을 첨부해주세요',
};

export default function useCheckOwnerData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<OwnerData>({ mode: 'onSubmit' });
  const ownerNameRegister = register('ownerName', {
    required: { value: true, message: VALIDATIONMESSAGE.owerName },
  });
  const shopNameRegister = register('shopName', {
    required: { value: true, message: VALIDATIONMESSAGE.shopName },
  });
  const registrationNumberRegister = {
    front: register('registrationNumberFront', {
      required: { value: true, message: VALIDATIONMESSAGE.registraionNumber },
    }),
    middle: register('registrationNumberMiddle', {
      required: { value: true, message: VALIDATIONMESSAGE.registraionNumber },
    }),
    end: register('registrationNumberEnd', {
      required: { value: true, message: VALIDATIONMESSAGE.registraionNumber },
    }),
    message: errors.registrationNumberFront?.message
     || errors.registrationNumberMiddle?.message
     || errors.registrationNumberEnd?.message,
  };
  const phoneNumberRegister = {
    front: register('phoneFront', {
      required: { value: true, message: VALIDATIONMESSAGE.phoneNumber },
    }),
    middle: register('phoneMiddle', {
      required: { value: true, message: VALIDATIONMESSAGE.phoneNumber },
    }),
    end: register('phoneEnd', {
      required: { value: true, message: VALIDATIONMESSAGE.phoneNumber },
    }),
    message: errors.phoneFront?.message || errors.phoneMiddle?.message || errors.phoneEnd?.message,
  };
  const fileRegister = register('registerFiles', {
    required: { value: true, message: VALIDATIONMESSAGE.file },
  });

  const getPhoneNumber = () => `${watch('registrationNumberFront')}-${watch('registrationNumberMiddle')}-${watch('registrationNumberEnd')}`;

  const getRegisterNumber = () => `${watch('phoneFront')}-${watch('phoneMiddle')}-${watch('phoneEnd')}`;

  const { searchShopState } = useModalStore();
  useEffect(() => {
    setValue('shopName', searchShopState);
  }, [searchShopState, setValue]);

  return {
    ownerNameRegister,
    shopNameRegister,
    phoneNumberRegister,
    registrationNumberRegister,
    fileRegister,
    errors,
    watch,
    handleSubmit,
    setValue,
    getPhoneNumber,
    getRegisterNumber,
  };
}
