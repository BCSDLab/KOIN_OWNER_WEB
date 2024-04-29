/* eslint-disable react-hooks/exhaustive-deps */
import useStepStore from 'store/useStepStore';
import useShopRegistrationStore from 'store/shopRegistration';
import useOperateTimeState from 'page/ShopRegistration/hooks/useOperateTimeState';
import { SubmitHandler, useForm } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postShop } from 'api/shop';
import { useEffect } from 'react';
import { DAY_OF_WEEK, WEEK } from 'utils/constant/week';
import useModalStore from 'store/modalStore';
import CheckSameTime from 'page/ShopRegistration/hooks/CheckSameTime';
import { isKoinError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import styles from './ShopConfirmation.module.scss';

export const usePostData = (setStep: (step: number) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (form: OwnerShop) => postShop(form),
    onSuccess: () => {
      setStep(5);
      queryClient.refetchQueries();
    },
    onError: (e) => {
      if (isKoinError(e)) {
        showToast('error', e.message);
      }
    },
  });
  return mutation;
};

export default function ShopConfirmation() {
  const { setStep } = useStepStore();
  const {
    category,
    categoryId,
    imageUrls,
    name,
    address,
    phone,
    deliveryPrice,
    description,
    delivery,
    payBank,
    payCard,
  } = useShopRegistrationStore();

  const operateTimeState = useOperateTimeState();

  const { handleSubmit, setValue } = useForm<OwnerShop>({
    resolver: zodResolver(OwnerShop),
  });

  const mutation = usePostData(setStep);

  const onSubmit: SubmitHandler<OwnerShop> = (data) => {
    mutation.mutate(data);
  };

  const { openTimeState, closeTimeState, shopClosedState } = useModalStore();
  const { isAllSameTime, hasClosedDay, isSpecificDayClosedAndAllSameTime } = CheckSameTime();

  const openTimeArray = Object.values(openTimeState);
  const closeTimeArray = Object.values(closeTimeState);
  const shopClosedArray = Object.values(shopClosedState);

  useEffect(() => {
    const openValue = DAY_OF_WEEK.map((day, index) => ({
      close_time: closeTimeArray[index],
      closed: shopClosedArray[index],
      day_of_week: day,
      open_time: openTimeArray[index],
    }));
    setValue('image_urls', imageUrls);
    setValue('category_ids', categoryId);
    setValue('name', name);
    setValue('address', address);
    setValue('phone', phone);
    setValue('delivery_price', Number(deliveryPrice));
    setValue('description', description);
    setValue('delivery', delivery);
    setValue('pay_bank', payBank);
    setValue('pay_card', payCard);
    setValue('open', openValue);
  }, [openTimeArray, closeTimeArray, shopClosedArray, categoryId, name,
    address, phone, deliveryPrice, description, delivery, payBank, payCard, imageUrls]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.form__info}>
          <span className={styles.form__title}>카테고리</span>
          <span className={styles.form__value}>{category}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>가게명</span>
          <span className={styles.form__value}>{name}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>주소정보</span>
          <span className={styles.form__value}>{address}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>전화번호</span>
          <span className={styles.form__value}>{phone}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>배달금액</span>
          <span className={styles.form__value}>{deliveryPrice === 0 ? '무료' : `${deliveryPrice}원`}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>운영시간</span>
          <span className={styles.form__value}>
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
          </span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>기타정보</span>
          <span className={styles.form__value}>{description}</span>
        </div>
        <div className={styles.form__checkbox}>
          <label htmlFor="delivery" className={styles['form__checkbox-label']}>
            <input type="checkbox" id="delivery" className={styles['form__checkbox-input']} readOnly checked={delivery} />
            <span>배달 가능</span>
          </label>
          <label htmlFor="card" className={styles['form__checkbox-label']}>
            <input type="checkbox" id="card" className={styles['form__checkbox-input']} readOnly checked={payCard} />
            <span>카드 가능</span>
          </label>
          <label htmlFor="bank" className={styles['form__checkbox-label']}>
            <input type="checkbox" id="bank" className={styles['form__checkbox-input']} readOnly checked={payBank} />
            <span>계좌이체 가능</span>
          </label>
        </div>
      </div>
      <div className={styles.form__button}>
        <button type="submit">등록</button>
      </div>
    </form>
  );
}
