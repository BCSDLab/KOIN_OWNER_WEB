import { ReactComponent as PreviousArrowIcon } from 'assets/svg/common/mobile-back-arrow.svg';
import styles from './PreviousStep.module.scss';

interface PreviousStepProps {
  step: number;
}

export default function PreviousStep({ step }: PreviousStepProps) {
  return (
    <div className={styles.previous}>
      <button type="button" className={styles.previous__button} disabled={step === 1}>
        <PreviousArrowIcon title="이전 단계로 가기" />
      </button>
    </div>
  );
}
