import STEPS from 'page/Auth/Signup/constant/signupStep';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  step:number
}
export default function ProgressBar({ step }:ProgressBarProps) {
  return (
    <div className={styles['progress-bar']}>
      <div className={styles['progress-bar__step']}>
        <span className={styles['progress-bar__step-name']}>
          {`${step}. ${STEPS[step - 1]}`}
        </span>
        <span className={styles['progress-bar__step-level']}>
          {`${step} / ${STEPS.length}`}
        </span>
      </div>
      <div
        className={styles[`progress-bar__active--${step}`]}
      />
    </div>
  );
}
