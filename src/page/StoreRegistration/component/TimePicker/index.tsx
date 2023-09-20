import { useState, useRef, useEffect } from 'react';
import styles from './TimePicker.module.scss';

const hours: number[] = Array.from({ length: 24 }, (_, i) => i);
const minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5);

export default function OperatingHour() {
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({
    hour: '00',
    minute: '00',
  });

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isOpen && (!dropMenuRef.current?.contains(e.target))) setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpen]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function handleTimeChange(e: any) {
    const selectedValue = parseInt(e.target.value, 10);
    const selectedId = e.target.id;

    // 선택한 시간 또는 분을 텍스트로 업데이트
    setTime({
      ...time,
      [selectedId]: selectedValue < 10 ? `0${selectedValue}` : selectedValue.toString(),
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
                onClick={handleTimeChange}
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
                onClick={handleTimeChange}
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
