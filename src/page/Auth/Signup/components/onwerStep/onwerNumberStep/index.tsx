import {
  Button, Input, Title, ValidationMessage,
} from 'page/Auth/components/Common/form';
import { useFormContext } from 'react-hook-form';
import styles from 'page/Auth/Signup/components/onwerStep/common/common.module.scss';
import { DefaultProps } from 'page/Auth/Signup/components/onwerStep/common/model';
import { Register } from 'model/auth';

export default function OnwerNumberStep({ nextStep } : DefaultProps) {
  const { register, formState: { errors }, watch } = useFormContext<Register>();
  const ownerNumber = watch('company_number');

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
        disabled={!!errors.company_number || !ownerNumber}
      >
        다음
      </Button>
    </div>
  );
}
