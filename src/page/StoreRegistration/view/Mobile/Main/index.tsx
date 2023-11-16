import { ReactComponent as EmptyImgIcon } from 'assets/svg/shopRegistration/mobile-empty-img.svg';
import useStepStore from 'store/useStepStore';
import styles from './Main.module.scss';

export default function Main() {
  const { increaseStep } = useStepStore();

  return (
    <div className={styles.form}>
      <div className={styles.form__img}>
        <EmptyImgIcon />
        <div>등록된 이미지가 없습니다.</div>
      </div>
      <label htmlFor="name" className={styles.form__label}>
        가게명
        <input type="text" id="name" className={styles.form__input} />
      </label>
      <label htmlFor="address" className={styles.form__label}>
        주소정보
        <input type="text" id="address" className={styles.form__input} />
      </label>
      <div className={styles.form__button}>
        <button type="button" onClick={increaseStep}>다음</button>
      </div>
    </div>
  );
}
