/* eslint-disable jsx-a11y/label-has-associated-control */
import OperateTimeMobile from 'page/StoreRegistration/component/Modal/OperateTimeMobile';
import useBooleanState from 'utils/hooks/useBooleanState';
import useStepStore from 'store/useStepStore';
import styles from './Sub.module.scss';

export default function Sub() {
  const { increaseStep } = useStepStore();
  const {
    value: showOperateTime,
    setTrue: openOperateTime,
    setFalse: closeOperateTime,
  } = useBooleanState(false);

  return (
    <div className={styles.form}>
      <label htmlFor="phone" className={styles.form__label}>
        전화번호
        <input type="text" id="phone" className={styles.form__input} />
      </label>
      <label htmlFor="delivery-cost" className={styles.form__label}>
        배달금액
        <input type="text" id="delivery-cost" className={styles.form__input} />
      </label>
      <label className={styles.form__label}>
        운영시간
        <span>00:00~24:00</span>
        <button
          type="button"
          className={styles['form__label-button']}
          onClick={openOperateTime}
        >
          수정
        </button>
        <OperateTimeMobile isOpen={showOperateTime} closeModal={closeOperateTime} />
      </label>
      <label htmlFor="extra-info" className={styles.form__label}>
        기타정보
        <input type="text" id="extra-info" className={styles.form__input} />
      </label>
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
      <div className={styles.form__button}>
        <button type="button" onClick={increaseStep}>다음</button>
      </div>
    </div>
  );
}
