import { useForm } from 'react-hook-form';
import { Owner } from 'page/Auth/Signup/types/Owner';
import useModalStore from 'store/modalStore';
import { useCallback, useEffect } from 'react';

const VALIDATIONMESSAGE = {
  owerName: '대표자명을 입력해주세요',
  shopName: '가게명을 입력해주세요',
  registraionNumber: '사업자 등록번호를 입력해주세요',
  phoneNumber: '대표자 연락처를 입력해주세요',
  file: '파일을 첨부해주세요',
};

export default function useCheckOwnerData(
  isMobile:boolean,
  setOwnerData:(data:Owner)=>void,
  ownerData:Owner,
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setFocus,
  } = useForm<Owner>({ mode: 'onSubmit' });

  const ownerNameRegister = register('ownerName', {
    required: { value: true, message: VALIDATIONMESSAGE.owerName },
    onBlur: () => {
      if (watch('ownerName') !== '') {
        setOwnerData({ ...ownerData, ownerName: watch('ownerName') });
      }
    },
  });

  const shopNameRegister = register('shopName', {
    required: { value: true, message: VALIDATIONMESSAGE.shopName },
    onBlur: () => {
      if (watch('shopName') !== '') {
        setOwnerData({ ...ownerData, shopName: watch('shopName') });
      }
    },
  });

  const registrationNumberRegister = {
    front: register('registrationNumberFront', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.registraionNumber },
      pattern: {
        value: /[0-9]{3,3}$/,
        message: '3자리 숫자를 입력해주세요.',
      },
      onBlur: () => {
        if (watch('registrationNumberFront') !== '') {
          setOwnerData({ ...ownerData, registrationNumberFront: watch('registrationNumberFront') });
        }
      },
    }),
    middle: register('registrationNumberMiddle', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.registraionNumber },
      pattern: {
        value: /[0-9]{2,2}$/,
        message: '2자리 숫자를 입력해주세요.',
      },
      onBlur: () => {
        if (watch('registrationNumberMiddle') !== '') {
          setOwnerData({ ...ownerData, registrationNumberMiddle: watch('registrationNumberMiddle') });
        }
      },
    }),
    end: register('registrationNumberEnd', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.registraionNumber },
      pattern: {
        value: /[0-9]{5,5}$/,
        message: '5자리 숫자를 입력해주세요.',
      },
      onBlur: () => {
        if (watch('registrationNumberEnd') !== '') {
          setOwnerData({ ...ownerData, registrationNumberEnd: watch('registrationNumberEnd') });
        }
      },
    }),
    mobile: register('registrationNumberMobile', {
      required: { value: isMobile, message: VALIDATIONMESSAGE.registraionNumber },
      pattern: {
        value: /[0-9]{10,10}$/,
        message: '-를 제외하고 모두 입력해주세요.',
      },
      onBlur: () => {
        if (watch('registrationNumberMobile') !== '') {
          setOwnerData({ ...ownerData, registrationNumberMobile: watch('registrationNumberMobile') });
        }
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
      onBlur: () => {
        if (watch('phoneFront') !== '') {
          setOwnerData({ ...ownerData, phoneFront: watch('phoneFront') });
        }
      },
    }),
    middle: register('phoneMiddle', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]{4,4}$/,
        message: '4자리 숫자를 입력해주세요.',
      },
      onBlur: () => {
        if (watch('registrationNumberMiddle') !== '') {
          setOwnerData({ ...ownerData, phoneMiddle: watch('phoneMiddle') });
        }
      },
    }),
    end: register('phoneEnd', {
      required: { value: !isMobile, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]{4,4}$/,
        message: '4자리 숫자를 입력해주세요.',
      },
      onBlur: () => {
        if (watch('phoneEnd') !== '') {
          setOwnerData({ ...ownerData, phoneEnd: watch('phoneEnd') });
        }
      },
    }),
    mobile: register('phoneMobile', {
      required: { value: isMobile, message: VALIDATIONMESSAGE.phoneNumber },
      pattern: {
        value: /[0-9]$/,
        message: '-를 제외하고 모두 입력해주세요.',
      },
      onBlur: () => {
        if (watch('phoneMobile') !== '') {
          setOwnerData({ ...ownerData, phoneMobile: watch('phoneMobile') });
        }
      },
    }),
    message: errors.phoneFront?.message
    || errors.phoneMiddle?.message
    || errors.phoneEnd?.message
    || errors.phoneMobile?.message,
  };

  const fileRegister = register('registerFiles', {
    required: { value: true, message: VALIDATIONMESSAGE.file },
    onChange: () => { setOwnerData({ ...ownerData, registerFiles: watch('registerFiles') }); },
  });

  const getPhoneNumber = useCallback(() => [watch('phoneFront'), watch('phoneMiddle'), watch('phoneEnd')], [watch]);
  const getRegisterationNumber = useCallback(() => [watch('registrationNumberFront'), watch('registrationNumberMiddle'), watch('registrationNumberEnd')], [watch]);

  const { searchShopState } = useModalStore();

  useEffect(() => {
    setValue('shopName', searchShopState);
  }, [searchShopState, setValue]);

  const registerNumberFront = watch('registrationNumberFront') ? watch('registrationNumberFront') : null;
  const registerNumberMiddle = watch('registrationNumberMiddle') ? watch('registrationNumberMiddle') : null;

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

  const shopName = watch('shopName');

  useEffect(() => {
    setFocus('shopName');
  }, [shopName, setFocus]);

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
