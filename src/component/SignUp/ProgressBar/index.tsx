import STEPS from 'static/signupStep';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  step:number
}
export default function ProgressBar({ step }:ProgressBarProps) {
  return (
    <div className={styles[`progress-bar--${step}`]}>
      <span className={styles['progress-bar__step-name']}>
        {step}
        .&nbsp;
        {STEPS[step - 1]}
      </span>
      <span className={styles['progress-bar__step']}>
        {step}
                &nbsp;/&nbsp;
        {STEPS.length}
      </span>
    </div>
  );
}
