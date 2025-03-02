import { Register } from 'model/auth';
import {
  Button, Input, Title, ValidationMessage,
} from 'page/Auth/components/Common/form';
import { useFormContext } from 'react-hook-form';
import styles from 'page/Auth/Signup/components/onwerStep/common/common.module.scss';
import { DefaultProps } from 'page/Auth/Signup/components/onwerStep/common/model';

export default function NameStep({ nextStep }: DefaultProps) {
  const { register, formState: { errors }, watch } = useFormContext<Register>();
  const name = watch('name');

  return (
    <div className={styles.container}>
      <div>
        <Title title="사장님의 성명(실명)을 입력해주세요" />
        <Input
          register={register}
          name="name"
          placeholder="성명을 입력해주세요."
          required
          requiredMessage="성명을 입력해주세요."
        />
        <ValidationMessage
          isError={!!errors.name}
          message={errors.name?.message}
        />
      </div>
      <Button
        onClick={nextStep}
        disabled={!!errors.name || !name}
      >
        다음
      </Button>
    </div>
  );
}
