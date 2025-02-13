import { Register } from 'model/auth';
import {
  Button, Input, Title, ValidationMessage,
} from 'page/Auth/components/Common/form';
import { useFormContext } from 'react-hook-form';
import SearchIcon from 'assets/svg/auth/search-glasses.svg?url';
import styles from 'page/Auth/Signup/components/onwerStep/common/common.module.scss';
import { DefaultProps } from 'page/Auth/Signup/components/onwerStep/common/model';
import { useEffect, useState } from 'react';
import SearchShop from 'page/Auth/Signup/components/searchShop';

export default function ShopStep({ nextStep }: DefaultProps) {
  const {
    register, formState: { errors }, watch, clearErrors, setValue,
  } = useFormContext<Register>();
  const [isShowSearch, setIsShowSearch] = useState(false);
  const shopName = watch('shop_name');

  const onChange = () => {
    setValue('shop_id', null);
  };

  useEffect(() => {
    if (shopName) {
      clearErrors('shop_name');
    }
  }, [shopName, clearErrors]);

  if (isShowSearch) return <SearchShop nextStep={() => setIsShowSearch(false)} />;

  return (
    <div className={styles.container}>
      <div>
        <Title title="가게명을 입력해주세요." />
        <Input
          register={register}
          name="shop_name"
          required
          requiredMessage="가게명을 입력해주세요."
          placeholder="가게명을 입력해주세요."
          onChange={onChange}
        />
        <ValidationMessage
          isError={!!errors.shop_name}
          message={errors.shop_name?.message}
        />
        <Button
          onClick={() => setIsShowSearch(true)}
        >
          <div className={styles.center}>
            등록된 가게 검색
            <img src={SearchIcon} alt="검색" />
          </div>
        </Button>
      </div>
      <Button
        onClick={nextStep}
        disabled={!!errors.shop_name || !shopName}
      >
        다음
      </Button>
    </div>
  );
}
