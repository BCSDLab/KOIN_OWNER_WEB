import { WEEK } from 'utils/constant/week';
import { useCallback } from 'react';
import useModalStore, { OperatingTime } from 'store/modalStore';
import cn from 'utils/ts/className';
import styles from './TimeDialPicker.module.scss';

export default function TimeDialPicker() {
  const { shopClosedState } = useModalStore();

  const handleDayClick = useCallback((day: typeof WEEK[number]) => {
    useModalStore.setState((prev) => {
      const newState: {
        openTimeState: OperatingTime;
        closeTimeState: OperatingTime;
        shopClosedState: { [key: string]: boolean };
      } = {
        ...prev,
        shopClosedState: {
          ...prev.shopClosedState,
          [day]: !prev.shopClosedState[day],
        },
      };

      if (!prev.shopClosedState[day] && newState.shopClosedState[day]) {
        newState.openTimeState[day] = '00:00';
        newState.closeTimeState[day] = '00:00';
      }

      return newState;
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles['day-picker-container']}>
        {WEEK.map((day) => {
          const isClosed = shopClosedState[day];
          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(day)}
              className={cn({
                [styles.dayButton]: true,
                [styles.dayButtonActive]: !isClosed,
                [styles.dayButtonSat]: day === '토',
                [styles.dayButtonSun]: day === '일',
              })}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
