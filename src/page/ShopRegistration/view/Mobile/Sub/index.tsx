import OperateTimeMobile from 'page/ShopRegistration/component/Modal/OperateTimeMobile';
import useBooleanState from 'utils/hooks/useBooleanState';
import useOperateTimeState from 'page/ShopRegistration/hooks/useOperateTimeState';
import CheckSameTime from 'page/ShopRegistration/hooks/CheckSameTime';
import { DAY_OF_WEEK, WEEK } from 'utils/constant/week';
import useModalStore from 'store/modalStore';
import ErrorMessage from 'component/common/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import cn from 'utils/ts/className';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import styles from './Sub.module.scss';

export default function Sub({ onNext }:{ onNext: () => void }) {
  const {
    value: showOperateTime,
    setTrue: openOperateTime,
    setFalse: closeOperateTime,
  } = useBooleanState(false);

  const operateTimeState = useOperateTimeState();
  const {
    isAllSameTime,
    hasClosedDay,
    isSpecificDayClosedAndAllSameTime,
    isAllClosed,
  } = CheckSameTime();

  const { openTimeState, closeTimeState, shopClosedState } = useModalStore();
  const openTimeArray = Object.values(openTimeState);
  const closeTimeArray = Object.values(closeTimeState);
  const shopClosedArray = Object.values(shopClosedState);

  const {
    register, control, trigger, setValue, formState: { errors },
  } = useFormContext();

  const phone = useWatch({ control, name: 'phone' });
  const deliveryPrice = useWatch({ control, name: 'delivery_price' });
  const description = useWatch({ control, name: 'description' });
  const delivery = useWatch({ control, name: 'delivery' });
  const payBank = useWatch({ control, name: 'paya_bank' });
  const payCard = useWatch({ control, name: 'pay_card' });

  useEffect(() => {
    const openValue = DAY_OF_WEEK.map((day, index) => ({
      close_time: closeTimeArray[index],
      closed: shopClosedArray[index],
      day_of_week: day,
      open_time: openTimeArray[index],
    }));
    setValue('open', openValue);
  }, [closeTimeArray, openTimeArray, setValue, shopClosedArray]);

  const formatPhoneNumber = (inputNumber:string) => {
    const phoneNumber = inputNumber.replace(/\D/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handlePhoneChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    setValue('phone', formattedValue);
  };

  const handleNextClick = async () => {
    const isValid = await trigger(['phone']);
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
          id="phone"
          value={phone}
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
          id="deliveryPrice"
          value={deliveryPrice === 0 ? '' : deliveryPrice}
          className={styles.form__input}
          {...register('delivery_price')}
          onWheel={(e) => (e.target as HTMLElement).blur()} // 마우스 스크롤로 숫자 변경 방지
        />
      </label>
      <div className={styles.form__label}>
        운영시간
        <span>
          {
            isAllSameTime && !hasClosedDay ? (
              <div>
                {operateTimeState.time}
              </div>
            )
              : null
          }
          {
            isSpecificDayClosedAndAllSameTime ? (
              <div>
                <div>{operateTimeState.time}</div>
                <div>{operateTimeState.holiday}</div>
              </div>
            ) : null
          }
          {
            !isAllSameTime && !isSpecificDayClosedAndAllSameTime && !isAllClosed ? (
              <>
                {WEEK.map((day) => (
                  <div key={day}>
                    {shopClosedState[day] ? `${operateTimeState[day]}` : `${day} : ${operateTimeState[day]}`}
                  </div>
                ))}
              </>
            ) : null
          }
          {
            isAllClosed ? (
              <span>매일 휴무</span>
            ) : null
          }
        </span>
        <button
          type="button"
          className={styles['form__label-button']}
          onClick={openOperateTime}
        >
          수정
        </button>
      </div>
      <label htmlFor="extra-info" className={styles.form__label}>
        기타정보
        <input
          type="text"
          id="extra-info"
          className={styles.form__input}
          value={description}
          {...register('description')}
        />
      </label>
      <div className={styles.form__checkbox}>
        <label htmlFor="delivery" className={styles['form__checkbox-label']}>
          <input
            type="checkbox"
            id="delivery"
            className={styles['form__checkbox-input']}
            checked={delivery}
            {...register('delivery')}
          />
          <span>배달 가능</span>
        </label>
        <label htmlFor="card" className={styles['form__checkbox-label']}>
          <input
            type="checkbox"
            id="card"
            className={styles['form__checkbox-input']}
            checked={payCard}
            {...register('pay_card')}
          />
          <span>카드 가능</span>
        </label>
        <label htmlFor="bank" className={styles['form__checkbox-label']}>
          <input
            type="checkbox"
            id="bank"
            className={styles['form__checkbox-input']}
            checked={payBank}
            {...register('pay_bank')}
          />
          <span>계좌이체 가능</span>
        </label>
      </div>
      <div className={styles.form__button}>
        <button type="button" onClick={handleNextClick}>다음</button>
      </div>
    </div>
  );
}
