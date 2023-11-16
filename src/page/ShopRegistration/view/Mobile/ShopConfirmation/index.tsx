import useStepStore from 'store/useStepStore';
import styles from './ShopConfirmation.module.scss';

export default function ShopConfirmation() {
  const { increaseStep } = useStepStore();

  return (
    <>
      <div className={styles.form}>
        <div className={styles.form__info}>
          <span className={styles.form__title}>카테고리</span>
          <span className={styles.form__value}>족발</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>가게명</span>
          <span className={styles.form__value}>가장 맛있는 족발</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>주소정보</span>
          <span className={styles.form__value}>천안시 동남구 충절로 880 가동 1층</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>전화번호</span>
          <span className={styles.form__value}>010-1234-5678</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>배달금액</span>
          <span className={styles.form__value}>무료</span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>운영시간</span>
          <span className={styles.form__value}>
            11:00~21:00
            <br />
            매주 화요일 정기 휴무
          </span>
        </div>
        <div className={styles.form__info}>
          <span className={styles.form__title}>기타정보</span>
          <span className={styles.form__value}>3대째 다져온 고집스러운 맛</span>
        </div>
        <div className={styles.form__checkbox}>
          <label htmlFor="delivery" className={styles['form__checkbox-label']}>
            <input type="checkbox" id="delivery" className={styles['form__checkbox-input']} />
            <span>배달 가능</span>
          </label>
          <label htmlFor="card" className={styles['form__checkbox-label']}>
            <input type="checkbox" id="card" className={styles['form__checkbox-input']} />
            <span>카드 가능</span>
          </label>
          <label htmlFor="bank" className={styles['form__checkbox-label']}>
            <input type="checkbox" id="bank" className={styles['form__checkbox-input']} />
            <span>계좌이체 가능</span>
          </label>
        </div>
      </div>
      <div className={styles.form__button}>
        <button type="button" onClick={increaseStep}>등록</button>
      </div>
    </>
  );
}
