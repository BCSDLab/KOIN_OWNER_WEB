import {
  useState, useRef, useEffect, MouseEvent,
} from 'react';
import styles from './TimePicker.module.scss';

const hours: number[] = Array.from({ length: 24 }, (_, i) => i);
const minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5);

export default function TimePicker() {
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({
    hour: '00',
    minute: '00',
  });

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

  function handleTimeClick(e: MouseEvent<HTMLButtonElement>) {
    const selectedTime = parseInt(e.currentTarget.value, 10);
    const selectedId = e.currentTarget.id;

    // 선택한 시간 또는 분을 텍스트로 업데이트
    setTime({
      ...time,
      [selectedId]: selectedTime.toString().padStart(2, '0'),
    });
  }

  return (
    <div className={styles.container} ref={dropMenuRef}>
      <button
        type="button"
        className={styles.container__hour}
        onClick={toggleModal}
      >
        {time.hour}
      </button>
      :
      <button
        type="button"
        className={styles.container__minute}
        onClick={toggleModal}
      >
        {time.minute}
      </button>
      {isOpen && (
        <div className={styles.content}>
          <div className={styles['content__hour-list']}>
            {hours.map((hour) => (
              <button
                key={hour}
                type="button"
                id="hour"
                className={styles['content__hour-item']}
                onClick={handleTimeClick}
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
                onClick={handleTimeClick}
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
