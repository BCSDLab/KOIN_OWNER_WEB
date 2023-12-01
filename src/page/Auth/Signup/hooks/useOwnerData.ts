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
    setFocus,
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
      pattern: {
        value: /[0-9]{3,3}$/,
        message: '3자리 숫자를 입력해주세요.',
      },
      maxLength: 3,
    }),
    middle: register('registrationNumberMiddle', {
      required: { value: true, message: VALIDATIONMESSAGE.registraionNumber },
      maxLength: 2,
      pattern: {
        value: /[0-9]{2,2}$/,
        message: '2자리 숫자를 입력해주세요.',
      },
    }),
    end: register('registrationNumberEnd', {
      required: { value: true, message: VALIDATIONMESSAGE.registraionNumber },
      pattern: {
        value: /[0-9]{5,5}$/,
        message: '5자리 숫자를 입력해주세요.',
      },
      maxLength: 5,
    }),
    message: errors.registrationNumberFront?.message
     || errors.registrationNumberMiddle?.message
     || errors.registrationNumberEnd?.message,
  };

  const phoneNumberRegister = {
    front: register('phoneFront', {
      required: { value: true, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]{3,3}$/,
        message: '3자리 숫자를 입력해주세요.',
      },
      maxLength: 3,
    }),
    middle: register('phoneMiddle', {
      required: { value: true, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]{4,4}$/,
        message: '4자리 숫자를 입력해주세요.',
      },
      maxLength: 4,
    }),
    end: register('phoneEnd', {
      required: { value: true, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]{4,4}$/,
        message: '4자리 숫자를 입력해주세요.',
      },
      maxLength: 4,
    }),
    message: errors.phoneFront?.message || errors.phoneMiddle?.message || errors.phoneEnd?.message,
  };
  const fileRegister = register('registerFiles', {
    required: { value: true, message: VALIDATIONMESSAGE.file },
  });

  const getPhoneNumber = () => `${watch('phoneFront')}-${watch('phoneMiddle')}-${watch('phoneEnd')}`;

  const getRegisterNumber = () => `${watch('registrationNumberFront')}-${watch('registrationNumberMiddle')}-${watch('registrationNumberEnd')}`;

  const { searchShopState } = useModalStore();

  useEffect(() => {
    setValue('shopName', searchShopState);
  }, [searchShopState, setValue]);

  const registerNumberFront = watch('registrationNumberFront');
  const registerNumberMiddle = watch('registrationNumberMiddle');
  useEffect(() => {
    if (registerNumberFront?.length === 3) {
      setFocus('registrationNumberMiddle');
    }
  }, [setFocus, registerNumberFront]);
  useEffect(() => {
    if (registerNumberMiddle?.length === 2) {
      setFocus('registrationNumberEnd');
    }
  }, [setFocus, registerNumberMiddle]);

  const phoneFront = watch('phoneFront');
  const phoneMiddle = watch('phoneMiddle');
  useEffect(() => {
    if (phoneFront?.length === 3) {
      setFocus('phoneMiddle');
    }
  }, [phoneFront, setFocus]);
  useEffect(() => {
    if (phoneMiddle?.length === 4) {
      setFocus('phoneEnd');
    }
  }, [phoneMiddle, setFocus]);

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
