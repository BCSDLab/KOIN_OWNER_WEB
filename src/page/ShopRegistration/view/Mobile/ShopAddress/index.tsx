import ErrorMessage from 'component/common/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import AddressSearch from 'page/ShopRegistration/component/Modal/AddressSearch';
import type { Juso } from 'model/shopInfo/address';
import cn from 'utils/ts/className';
import { useFormContext } from 'react-hook-form';
import styles from './ShopAddress.module.scss';

export default function AddressStep({ onNext, onPrev }:{
  onNext: () => void; onPrev: () => void;
}) {
  const {
    register, setValue, trigger, formState: { errors },
  } = useFormContext();

  const handleSelect = (addr: Juso) => {
    const main = addr.road_address?.trim() ? addr.road_address : addr.jibun_address;
    setValue('address', main, { shouldValidate: true, shouldDirty: true });
    setValue('address_detail', '', { shouldValidate: true, shouldDirty: true });
  };

  const handleNextClick = async () => {
    const isValid = await trigger(['address', 'address_detail']);
    if (!isValid) return;
    onNext();
  };

  return (
    <div className={styles.step}>
      <div className={styles.step__search}>
        <AddressSearch onSelect={handleSelect} />
      </div>
      <label
        htmlFor="shopAddress"
        className={cn({
          [styles.step__label]: true,
          [styles['step__label--error']]: errors.address !== undefined,
        })}
      >
        주소정보
        <input
          type="text"
          id="shopAddress"
          className={styles.step__input}
          {...register('address', { required: true })}
          readOnly
        />
      </label>
      <div className={styles.step__error}>
        {errors.address && <ErrorMessage message={ERRORMESSAGE.address} />}
      </div>
      <label
        htmlFor="shopAddressDetail"
        className={cn({
          [styles.step__label]: true,
          [styles['step__label--error']]: errors.address_detail !== undefined,
        })}
      >
        상세주소
        <input
          type="text"
          id="shopAddressDetail"
          className={styles.step__input}
          {...register('address_detail', { required: true })}
          placeholder="동/호수, 건물 내 위치 등"
        />
      </label>
      <div className={styles.step__footer}>
        <button
          className={styles.step__cancel}
          type="button"
          onClick={onPrev}
        >
          취소
        </button>
        <button
          className={cn({
            [styles.step__next]: true,
          })}
          type="button"
          onClick={handleNextClick}
        >
          확인
        </button>
      </div>
    </div>
  );
}
