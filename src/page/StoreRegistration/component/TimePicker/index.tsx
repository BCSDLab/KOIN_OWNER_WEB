/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState, useRef, useEffect, MouseEvent,
} from 'react';
import useModalStore from 'store/modalStore';
import WEEK from 'utils/constant/week';
import cn from 'utils/ts/className';
import styles from './TimePicker.module.scss';

type Weekday = typeof WEEK[number];

interface TimerPickerProps {
  operatingDay: Weekday;
  isOpenTimePicker: boolean;
}

const hours: number[] = Array.from({ length: 24 }, (_, i) => i);
const minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5);

export default function TimePicker({ operatingDay, isOpenTimePicker } : TimerPickerProps) {
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({
    hour: '00',
    minute: '00',
  });
  const {
    openTimeState, closeTimeState, storeClosedState, setOpenTimeState, setCloseTimeState,
  } = useModalStore();

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (isOpen && (!dropMenuRef.current?.contains(e.target as Node))) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function handleChangeOperateTime() {
    if (isOpenTimePicker) {
      setOpenTimeState({
        ...openTimeState,
        [operatingDay]: `${time.hour}:${time.minute}`,
      });
    } else {
      setCloseTimeState({
        ...closeTimeState,
        [operatingDay]: `${time.hour}:${time.minute}`,
      });
    }
  }

  function handleClickTimeChangeButton(e: MouseEvent<HTMLButtonElement>) {
    const selectedTime = Number(e.currentTarget.value);
    const selectedId = e.currentTarget.id;

    if (selectedId === 'hour') {
      setTime({
        ...time,
        hour: selectedTime.toString().padStart(2, '0'),
      });
    } else if (selectedId === 'minute') {
      setTime({
        ...time,
        minute: selectedTime.toString().padStart(2, '0'),
      });
    }
  }

  useEffect(() => {
    handleChangeOperateTime();
  }, [time, storeClosedState]);
  return (
    <div className={styles.container} ref={dropMenuRef}>
      <button
        type="button"
        className={cn({
          [styles.container__hour]: true,
          [styles['container__hour--selected']]: storeClosedState[operatingDay],
        })}
        onClick={toggleModal}
      >
        {`${time.hour}:`}
      </button>
      <button
        type="button"
        className={cn({
          [styles.container__minute]: true,
          [styles['container__minute--selected']]: storeClosedState[operatingDay],
        })}
        onClick={toggleModal}
      >
        {time.minute}
      </button>
      {isOpen && !storeClosedState[operatingDay] && (
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
      )}
    </div>
  );
}
