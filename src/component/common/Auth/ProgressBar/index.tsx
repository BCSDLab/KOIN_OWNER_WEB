import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  step: number;
  total: number;
  progressTitle: { step: number; title: string }[];
}

export default function ProgressBar({ step, total, progressTitle }: ProgressBarProps) {
  const calculateWidth = ((step + 1) / total) * 100;

  return (
    <div className={styles.progress}>
      <div className={styles.progress__title}>
        <span>{`${progressTitle[step].step}. ${progressTitle[step].title}`}</span>
        <span>{`${progressTitle[step].step} / ${total}`}</span>
      </div>
      <div className={styles.progress__bar}>
        <span
          className={styles['progress__bar--filled']}
          style={{ width: `${calculateWidth}%` }}
        />
      </div>
    </div>
  );
}
