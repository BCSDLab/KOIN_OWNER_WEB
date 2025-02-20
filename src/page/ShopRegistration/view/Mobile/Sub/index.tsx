import OperateTimeMobile from 'page/ShopRegistration/component/Modal/OperateTimeMobile';
import useBooleanState from 'utils/hooks/useBooleanState';
import useOperateTimeState from 'page/ShopRegistration/hooks/useOperateTimeState';
import CheckSameTime from 'page/ShopRegistration/hooks/CheckSameTime';
import ErrorMessage from 'component/common/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import cn from 'utils/ts/className';
import { useFormContext } from 'react-hook-form';
import useStoreTimeSetUp from 'page/ShopRegistration/hooks/useStoreTimeSetUp';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import styles from './Sub.module.scss';

export default function Sub({ onNext, onPrev }: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const {
    value: showOperateTime,
    setTrue: openOperateTime,
    setFalse: closeOperateTime,
  } = useBooleanState(false);

  const operateTimeState = useOperateTimeState();

  const { isAllClosed } = CheckSameTime();

  const {
    register, trigger, setValue, formState: { errors },
  } = useFormContext<OwnerShop>();

  useStoreTimeSetUp({ setValue });

  const formatPhoneNumber = (inputNumber: string) => {
    const phoneNumber = inputNumber.replace(/\D/g, '');
    return phoneNumber.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    setValue('phone', formattedValue);
  };

  const handleNextClick = async () => {
    const isValid = await trigger(['phone', 'delivery_price']);
    if (!isValid) {
      return;
    }
    onNext();
  };

  if (showOperateTime) {
    return (
      <OperateTimeMobile isOpen={showOperateTime} closeModal={closeOperateTime} />
    );
  }

  return (
    <div className={styles.form}>
      <label
        htmlFor="phone"
        className={cn({
          [styles.form__label]: true,
          [styles['form__label--error']]: errors.phone !== undefined,
        })}
      >
        전화번호
        <input
          type="text"
          inputMode="numeric"
          id="phone"
          className={styles.form__input}
          {...register('phone', {
            required: true,
            pattern: {
              value: /^\d{3}-\d{3,4}-\d{4}$/,
              message: ERRORMESSAGE.invalidPhone,
            },
            onChange: handlePhoneChange,
          })}
        />
      </label>
      <div className={styles['form__error-message']}>
        {errors.phone && <ErrorMessage message={ERRORMESSAGE.phone} />}
      </div>

      <label
        htmlFor="deliveryPrice"
        className={styles.form__label}
      >
        배달금액
        <input
          type="number"
          inputMode="numeric"
          id="deliveryPrice"
          className={styles.form__input}
          {...register('delivery_price')}
          onWheel={(e) => (e.target as HTMLElement).blur()}
        />
      </label>

      <div className={styles.form__label}>
        운영시간
        <div className={styles['form__label--date']}>
          {isAllClosed ? (
            <span>매일 휴무</span>
          ) : (
            <span className={styles.time}>{operateTimeState}</span>
          )}
          <button
            type="button"
            className={styles['form__label-button']}
            onClick={openOperateTime}
          >
            수정
          </button>
        </div>
      </div>

      <label htmlFor="extra-info" className={styles.form__label}>
        기타정보
        <input
          type="text"
          id="extra-info"
          className={styles.form__input}
          {...register('description')}
        />
      </label>

      <div className={styles.form__checkbox}>
        <label htmlFor="delivery" className={styles['form__checkbox-label']}>
          <input
            type="checkbox"
            id="delivery"
            className={styles['form__checkbox-input']}
            {...register('delivery')}
          />
          <span>배달 가능</span>
        </label>
        <label htmlFor="card" className={styles['form__checkbox-label']}>
          <input
            type="checkbox"
            id="card"
            className={styles['form__checkbox-input']}
            {...register('pay_card')}
          />
          <span>카드 가능</span>
        </label>
        <label htmlFor="bank" className={styles['form__checkbox-label']}>
          <input
            type="checkbox"
            id="bank"
            className={styles['form__checkbox-input']}
            {...register('pay_bank')}
          />
          <span>계좌이체 가능</span>
        </label>
      </div>

      <div className={styles.form__footer}>
        <button
          className={styles.form__cancel}
          type="button"
          onClick={onPrev}
        >
          취소
        </button>
        <button
          className={cn({
            [styles.form__next]: true,
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
