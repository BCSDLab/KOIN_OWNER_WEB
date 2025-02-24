import {
  Button, Input, Title, ValidationMessage,
} from 'page/Auth/components/Common/form';
import { useFormContext } from 'react-hook-form';
import styles from 'page/Auth/Signup/components/onwerStep/common/common.module.scss';
import { DefaultProps } from 'page/Auth/Signup/components/onwerStep/common/model';
import { Register } from 'model/auth';
import { useMutation } from '@tanstack/react-query';
import { validateCompanyNumber } from 'api/auth';
import { useEffect, useRef } from 'react';

interface Params {
  onError: () => void;
  onSuccess: () => void;
}

const useValidateOnwerNumber = ({ onError, onSuccess }: Params) => {
  const usedNumber = useRef('');
  const mutation = useMutation({
    mutationFn: (number: string) => validateCompanyNumber(number),
    onError,
    onSuccess,
  });

  return { mutation, usedNumber };
};

export default function OnwerNumberStep({ nextStep } : DefaultProps) {
  const {
    register, formState: { errors }, watch, setError, clearErrors,
  } = useFormContext<Register>();
  const ownerNumber = watch('company_number');
  const onError = () => {
    setError('company_number', { message: '이미 존재하는 사업자 등록 번호입니다.' });
  };
  const onSuccess = () => clearErrors('company_number');
  const { mutation, usedNumber } = useValidateOnwerNumber({ onError, onSuccess });

  useEffect(() => {
    if (ownerNumber.length === 10 && usedNumber.current !== ownerNumber) {
      const formattedNumber = `${ownerNumber.slice(0, 3)}-${ownerNumber.slice(3, 5)}-${ownerNumber.slice(5)}`;
      mutation.mutate(formattedNumber);
      usedNumber.current = ownerNumber;
    }
  }, [ownerNumber, mutation, usedNumber]);

  return (
    <div className={styles.container}>
      <div>
        <Title title="사업자 등록 번호를 입력해주세요." />
        <Input
          register={register}
          name="company_number"
          required
          requiredMessage="사업자 등록 번호를 입력해주세요."
          placeholder="사업자 등록 번호를 입력해주세요."
          pattern={/^[\d]{1,10}$/}
          patternMessage="숫자만 입력해주세요."
          maxLength={10}
        />
        <ValidationMessage
          isError={!!errors.company_number}
          message={errors.company_number?.message}
        />
      </div>
      <Button
        onClick={nextStep}
        disabled={!!errors.company_number || ownerNumber.length !== 10}
      >
        다음
      </Button>
    </div>
  );
}
