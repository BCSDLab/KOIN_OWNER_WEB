import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  step: number;
  total: number;
  progressTitle: { step: number; title: string }[];
}

export default function ProgressBar({ step, total, progressTitle }: ProgressBarProps) {
  return (
    <div className={styles.progress}>
      <div className={styles.progress__title}>
        <span>{`${progressTitle[step].step}. ${progressTitle[step].title}`}</span>
        <span>{`${progressTitle[step].step} / ${total}`}</span>
      </div>
      <progress className={styles.progress__bar} value={step + 1} max={total} />
    </div>
  );
}
