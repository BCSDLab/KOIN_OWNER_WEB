import { ReactComponent as PreviousArrowIcon } from 'assets/svg/common/mobile-back-arrow.svg';
import styles from './PreviousStep.module.scss';

export default function PreviousStep() {
  return (
    <div className={styles.previous}>
      <button type="button" className={styles.previous__button}>
        <PreviousArrowIcon title="이전 단계로 가기" />
      </button>
    </div>
  );
}
