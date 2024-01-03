import { MouseEvent } from 'react';
import styles from './TimeSelection.module.scss';

const hours: number[] = Array.from({ length: 24 }, (_, i) => i);
const minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5);

interface TimeSelectionProps {
  handleClickTimeChangeButton: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function TimeSelection({ handleClickTimeChangeButton }: TimeSelectionProps) {
  return (
    <div className={styles.content}>
      <div className={styles['content__hour-list']}>
        {hours.map((hour) => (
          <button
            key={hour}
            type="button"
            id="hour"
            className={styles['content__hour-item']}
            onClick={handleClickTimeChangeButton}
            value={hour}
          >
            {hour}
          </button>
        ))}
      </div>
      <div className={styles['content__minute-list']}>
        {minutes.map((minute) => (
          <button
            key={minute}
            type="button"
            id="minute"
            className={styles['content__minute-item']}
            onClick={handleClickTimeChangeButton}
            value={minute}
          >
            {minute}
          </button>
        ))}
      </div>
    </div>
  );
}
