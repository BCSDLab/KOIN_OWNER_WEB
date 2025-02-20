import useOperateTimeState from 'page/ShopRegistration/hooks/useOperateTimeState';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postShop } from 'api/shop';
import useModalStore from 'store/modalStore';
import { isKoinError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import useMyShop from 'query/shop';
import styles from './ShopConfirmation.module.scss';

interface UsePostDataProps {
  onNext?:() => void
}

export const usePostData = ({ onNext }: UsePostDataProps) => {
  const queryClient = useQueryClient();
  const { resetOperatingTime } = useModalStore();
  const mutation = useMutation({
    mutationFn: (form: OwnerShop) => postShop(form),
    onSuccess: () => {
      if (onNext) {
        onNext();
      }
      queryClient.refetchQueries();
      resetOperatingTime();
    },
    onError: (e) => {
      if (isKoinError(e)) {
        showToast('error', e.message);
      }
    },
  });
  return mutation;
};

export default function ShopConfirmation({ onNext, onPrev }:{
  onNext: () => void, onPrev: () => void
}) {
  const { categoryList } = useMyShop();
  const operateTimeState = useOperateTimeState();

  const { handleSubmit, getValues } = useFormContext<OwnerShop>();
  const values = getValues();
  const categoryId = categoryList?.shop_categories[values.category_ids[0] - 1].name;
  const mutation = usePostData({ onNext });
  const onSubmit: SubmitHandler<OwnerShop> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.form__info}>
          <span className={styles.form__title}>카테고리</span>
          <span className={styles.form__value}>{categoryId}</span>
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
          <span className={styles.form__value}>{values.delivery_price === 0 ? '무료' : `${values.delivery_price}원`}</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>운영시간</span>
          <span className={styles.form__value}>
            <span>
              <span className={styles.time}>{operateTimeState}</span>
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
      <div className={styles.form__footer}>
        <button className={styles.form__cancel} type="button" onClick={onPrev}>취소</button>
        <button
          className={styles.form__next}
          type="submit"
        >
          확인
        </button>
      </div>
    </form>
  );
}
