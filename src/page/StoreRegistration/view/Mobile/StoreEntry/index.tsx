import { ReactComponent as Memo } from 'assets/svg/StoreRegistration/memo.svg';
import useStepStore from 'store/useStepStore';
import styles from './StoreEntry.module.scss';

export default function StoreEntry() {
  const { increaseStep } = useStepStore();
  return (
    <div className={styles.block}>
      <Memo className={styles.block__icon} />
      <span className={styles.block__title}>가게 정보 기입</span>
      <div className={styles.block__text}>
        <span>
          가게의 다양한 정보를 입력 및 수정하여
        </span>
        <span>
          학생들에게 최신 가게 정보를 알려주세요.
        </span>
        <button type="button" className={styles.block__button} onClick={increaseStep}>가게 정보 기입</button>
      </div>
    </div>
  );
}
