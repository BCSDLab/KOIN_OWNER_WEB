import { useForm } from 'react-hook-form';
import { OwnerData } from 'page/Auth/Signup/types/OwnerData';
import useModalStore from 'store/modalStore';
import { useCallback, useEffect } from 'react';

const VALIDATIONMESSAGE = {
  owerName: '대표자명을 입력해주세요',
  shopName: '가게명을 입력해주세요',
  registraionNumber: '사업자 등록번호를 입력해주세요',
  phoneNumber: '대표자 연락처를 입력해주세요',
  file: '파일을 첨부해주세요',
};

export default function useCheckOwnerData(isMobile:boolean) {
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
      required: { value: !isMobile, message: VALIDATIONMESSAGE.registraionNumber },
      pattern: {
        value: /[0-9]{3,3}$/,
        message: '3자리 숫자를 입력해주세요.',
      },
    }),
    middle: register('registrationNumberMiddle', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.registraionNumber },
      pattern: {
        value: /[0-9]{2,2}$/,
        message: '2자리 숫자를 입력해주세요.',
      },
    }),
    end: register('registrationNumberEnd', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.registraionNumber },
      pattern: {
        value: /[0-9]{5,5}$/,
        message: '5자리 숫자를 입력해주세요.',
      },
    }),
    mobile: register('registrationNumberMobile', {
      required: { value: isMobile, message: VALIDATIONMESSAGE.registraionNumber },
      pattern: {
        value: /[0-9]{10,10}$/,
        message: '-를 제외하고 모두 입력해주세요.',
      },
    }),
    message: errors.registrationNumberFront?.message
     || errors.registrationNumberMiddle?.message
     || errors.registrationNumberEnd?.message
     || errors.registrationNumberMobile?.message,
  };

  const phoneNumberRegister = {
    front: register('phoneFront', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]{3,3}$/,
        message: '3자리 숫자를 입력해주세요.',
      },
    }),
    middle: register('phoneMiddle', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]{4,4}$/,
        message: '4자리 숫자를 입력해주세요.',
      },
    }),
    end: register('phoneEnd', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]{4,4}$/,
        message: '4자리 숫자를 입력해주세요.',
      },
    }),
    mobile: register('phoneMobile', {
      required: { value: isMobile, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]$/,
        message: '-를 제외하고 모두 입력해주세요.',
      },
    }),
    message: errors.phoneFront?.message
    || errors.phoneMiddle?.message
    || errors.phoneEnd?.message
    || errors.phoneMobile?.message,
  };

  const fileRegister = register('registerFiles', {
    required: { value: true, message: VALIDATIONMESSAGE.file },
  });

  const getPhoneNumber = useCallback(() => `${watch('phoneFront')}${watch('phoneMiddle')}${watch('phoneEnd')}`, [watch]);
  const getRegisterationNumber = useCallback(() => `${watch('registrationNumberFront')}${watch('registrationNumberMiddle')}${watch('registrationNumberEnd')}`, [watch]);

  const { searchShopState } = useModalStore();
  useEffect(() => {
    setValue('shopName', searchShopState);
  }, [searchShopState, setValue]);

  const registerNumberFront = watch('registrationNumberFront') ? watch('registrationNumberFront') : '';
  const registerNumberMiddle = watch('registrationNumberMiddle') ? watch('registrationNumberMiddle') : '';

  useEffect(() => {
    if (registerNumberFront?.length === 3) {
      setFocus('registrationNumberMiddle');
    }
  }, [setFocus, registerNumberFront, setValue]);
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
    getRegisterationNumber,
  };
}
