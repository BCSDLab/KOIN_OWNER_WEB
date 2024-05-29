import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  step: number;
  total: number;
  progressTitle: string;
}

export default function ProgressBar({ step, total, progressTitle }: ProgressBarProps) {
  return (
    <div className={styles.progress}>
      <div className={styles.progress__title}>
        <span>{`${step}. ${progressTitle}`}</span>
        <span>{`${step} / ${total}`}</span>
      </div>
      <progress className={styles.progress__bar} value={step} max={total} />
    </div>
  );
}
