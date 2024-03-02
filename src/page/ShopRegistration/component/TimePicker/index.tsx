/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState, useRef, useEffect, MouseEvent, useCallback,
} from 'react';
import useModalStore from 'store/modalStore';
import { WEEK } from 'utils/constant/week';
import cn from 'utils/ts/className';
import TimeSelection from 'page/ShopRegistration/component/Modal/TimeSelection';
import styles from './TimePicker.module.scss';

type Weekday = typeof WEEK[number];

interface TimerPickerProps {
  operatingDay: Weekday;
  isOpenTimePicker: boolean;
}

export default function TimePicker({ operatingDay, isOpenTimePicker } : TimerPickerProps) {
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({
    hour: '00',
    minute: '00',
  });
  const {
    openTimeState, closeTimeState, shopClosedState, setOpenTimeState, setCloseTimeState,
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

  const handleClickTimeChangeButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const selectedTime = Number(e.currentTarget.value);
      const selectedId = e.currentTarget.id;

      if (selectedId === 'hour') {
        setTime((prevTime) => ({
          ...prevTime,
          hour: selectedTime.toString().padStart(2, '0'),
        }));
      } else if (selectedId === 'minute') {
        setTime((prevTime) => ({
          ...prevTime,
          minute: selectedTime.toString().padStart(2, '0'),
        }));
      }
    },
    [],
  );

  useEffect(() => {
    handleChangeOperateTime();
  }, [time, shopClosedState]);

  useEffect(() => {
    if (isOpenTimePicker) {
      const openTime = openTimeState[operatingDay];
      time.hour = openTime ? openTime.slice(0, 2) : '00';
      time.minute = openTime ? openTime.slice(3, 5) : '00';
    } else {
      const closeTime = closeTimeState[operatingDay];
      time.hour = closeTime ? closeTime.slice(0, 2) : '00';
      time.minute = closeTime ? closeTime.slice(3, 5) : '00';
    }
  }, []);
  return (
    <div className={styles.container} ref={dropMenuRef}>
      <button
        type="button"
        className={cn({
          [styles.container__hour]: true,
          [styles['container__hour--selected']]: shopClosedState[operatingDay],
        })}
        onClick={toggleModal}
      >
        {`${time.hour}:`}
      </button>
      <button
        type="button"
        className={cn({
          [styles.container__minute]: true,
          [styles['container__minute--selected']]: shopClosedState[operatingDay],
        })}
        onClick={toggleModal}
      >
        {time.minute}
      </button>
      {isOpen && !shopClosedState[operatingDay] && (
        <TimeSelection handleClickTimeChangeButton={handleClickTimeChangeButton} />
      )}
    </div>
  );
}
