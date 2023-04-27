import STEPS from 'page/Auth/Signup/constant/signupStep';
import cn from 'utils/ts/className';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  step:number
}
export default function ProgressBar({ step }:ProgressBarProps) {
  return (
    <div className={cn({
      [styles[`progress-bar--${step}`]]: true,
      [styles['progress-bar']]: true,
    })}
    >
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
