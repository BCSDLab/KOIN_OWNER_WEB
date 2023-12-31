/* eslint-disable jsx-a11y/label-has-associated-control */
import OperateTimeMobile from 'page/ShopRegistration/component/Modal/OperateTimeMobile';
import useBooleanState from 'utils/hooks/useBooleanState';
import useStepStore from 'store/useStepStore';
import useShopRegistrationStore from 'store/shopRegistration';
import useOperateTimeState from 'page/ShopRegistration/hooks/useOperateTimeState';
import CheckSameTime from 'page/ShopRegistration/hooks/CheckSameTime';
import { WEEK } from 'utils/constant/week';
import useModalStore from 'store/modalStore';
import styles from './Sub.module.scss';

export default function Sub() {
  const { increaseStep } = useStepStore();
  const {
    value: showOperateTime,
    setTrue: openOperateTime,
    setFalse: closeOperateTime,
  } = useBooleanState(false);
  const {
    setPhone, setDeliveryPrice, setDescription, setDelivery, setPayBank, setPayCard,
  } = useShopRegistrationStore();

  const {
    phone, deliveryPrice, description, delivery, payBank, payCard,
  } = useShopRegistrationStore();

  const operateTimeState = useOperateTimeState();
  const { isAllSameTime, hasClosedDay, isSpecificDayClosedAndAllSameTime } = CheckSameTime();
  const { shopClosedState } = useModalStore();

  const formatPhoneNumber = (inputNumber: string) => {
    const phoneNumber = inputNumber.replace(/\D/g, '');
    const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return formattedPhoneNumber;
  };

  if (showOperateTime) {
    return (
      <OperateTimeMobile isOpen={showOperateTime} closeModal={closeOperateTime} />
    );
  }

  return (
    <div className={styles.form}>
      <label htmlFor="phone" className={styles.form__label}>
        전화번호
        <input
          type="text"
          id="phone"
          onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
          value={phone}
          className={styles.form__input}
        />
      </label>
      <label htmlFor="deliveryPrice" className={styles.form__label}>
        배달금액
        <input
          type="number"
          id="deliveryPrice"
          onChange={(e) => setDeliveryPrice(Number(e.target.value))}
          value={deliveryPrice}
          className={styles.form__input}
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
            !isAllSameTime && !isSpecificDayClosedAndAllSameTime ? (
              <>
                {WEEK.map((day) => (
                  <div key={day}>
                    {shopClosedState[day] ? `${operateTimeState[day]}` : `${day} : ${operateTimeState[day]}`}
                  </div>
                ))}
              </>
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
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
      <div className={styles.form__checkbox}>
        <label htmlFor="delivery" className={styles['form__checkbox-label']}>
          <input
            type="checkbox"
            id="delivery"
            onChange={(e) => setDelivery(e.target.checked)}
            className={styles['form__checkbox-input']}
            checked={delivery}
          />
          <span>배달 가능</span>
        </label>
        <label htmlFor="card" className={styles['form__checkbox-label']}>
          <input
            type="checkbox"
            id="card"
            onChange={(e) => setPayCard(e.target.checked)}
            className={styles['form__checkbox-input']}
            checked={payCard}
          />
          <span>카드 가능</span>
        </label>
        <label htmlFor="bank" className={styles['form__checkbox-label']}>
          <input
            type="checkbox"
            id="bank"
            onChange={(e) => setPayBank(e.target.checked)}
            className={styles['form__checkbox-input']}
            checked={payBank}
          />
          <span>계좌이체 가능</span>
        </label>
      </div>
      <div className={styles.form__button}>
        <button type="button" onClick={increaseStep}>다음</button>
      </div>
    </div>
  );
}
