/* eslint-disable react-hooks/exhaustive-deps */
import useStepStore from 'store/useStepStore';
import useOperateTimeState from 'page/ShopRegistration/hooks/useOperateTimeState';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postShop } from 'api/shop';
import { WEEK } from 'utils/constant/week';
import useModalStore from 'store/modalStore';
import CheckSameTime from 'page/ShopRegistration/hooks/CheckSameTime';
import { isKoinError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import useMyShop from 'query/shop';
import styles from './ShopConfirmation.module.scss';

interface UsePostDataProps {
  onNext?:() => void
}

export const usePostData = ({ onNext } : UsePostDataProps) => {
  const queryClient = useQueryClient();
  const { setStep } = useStepStore();
  const mutation = useMutation({
    mutationFn: (form: OwnerShop) => postShop(form),
    onSuccess: () => {
      setStep(5);
      if (onNext) {
        onNext();
      }
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

export default function ShopConfirmation({ onNext }:{ onNext: () => void }) {
  const { categoryList } = useMyShop();
  const operateTimeState = useOperateTimeState();

  const { handleSubmit, getValues } = useFormContext<OwnerShop>();
  const values = getValues();
  const categoryId = categoryList?.shop_categories[values.category_ids[0] - 1].name;

  const mutation = usePostData({ onNext });
  const onSubmit: SubmitHandler<OwnerShop> = (data) => {
    mutation.mutate(data);
  };

  const { shopClosedState } = useModalStore();
  const { isAllSameTime, hasClosedDay, isSpecificDayClosedAndAllSameTime } = CheckSameTime();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.form__info}>
          <span className={styles.form__title}>카테고리</span>
          <span className={styles.form__value}>{categoryId ?? values.category_ids}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>가게명</span>
          <span className={styles.form__value}>{values.name}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>주소정보</span>
          <span className={styles.form__value}>{values.address}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>전화번호</span>
          <span className={styles.form__value}>{values.phone}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>배달금액</span>
          <span className={styles.form__value}>{Number(values.delivery_price) === 0 ? '무료' : `${Number(values.delivery_price)}원`}</span>
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
          <span className={styles.form__value}>{values.description}</span>
        </div>
        <div className={styles.form__checkbox}>
          <label htmlFor="delivery" className={styles['form__checkbox-label']}>
            <input type="checkbox" id="delivery" className={styles['form__checkbox-input']} readOnly checked={values.delivery} />
            <span>배달 가능</span>
          </label>
          <label htmlFor="card" className={styles['form__checkbox-label']}>
            <input type="checkbox" id="card" className={styles['form__checkbox-input']} readOnly checked={values.pay_card} />
            <span>카드 가능</span>
          </label>
          <label htmlFor="bank" className={styles['form__checkbox-label']}>
            <input type="checkbox" id="bank" className={styles['form__checkbox-input']} readOnly checked={values.pay_bank} />
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
