import dayjs from 'dayjs';
import { useState } from 'react';
import { getDayOfWeek } from 'page/Coop/hook/useGetDayOfWeek';
import cn from 'utils/ts/className';
import styles from './Calendar.module.scss';

interface DateProps {
  selectedDate: string;
  setSelectedDate: (dateType: string) => void;
}
export default function Calendar({ selectedDate, setSelectedDate }: DateProps) {
  const today = dayjs();
  const weekDays = Array.from({ length: 7 }, (_, i) => today.add(i - 3, 'day'));

  return (
    <div className={styles.container}>
      <div className={styles.container__week}>
        {weekDays.map((day) => (
          <div key={day.format('YYYY-MM-DD')}>
            <div className={styles['container__date--common']}>{getDayOfWeek(day.format('YYYY-MM-DD'))}</div>
          </div>
        ))}
      </div>
      <div className={styles.container__date}>
        {weekDays.map((day) => {
          const dayFormat = day.format('YYYY-MM-DD');
          return (
            <div
              key={dayFormat}
              tabIndex={0}
              role="button"
              onClick={() => setSelectedDate(dayFormat)}
              className={styles['container__date--wrapper']}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setSelectedDate(dayFormat);
                }
              }}
            >
              <div
                className={cn({
                  [styles['container__date--selected']]: dayFormat === selectedDate,
                  [styles['container__date--common']]: !day.isSame(today, 'day') && dayFormat !== selectedDate,
                  [styles['cursor-pointer']]: true,
                  [styles['container__date--wrapper']]: day.isSame(today, 'day'),
                  [styles['container__date--today']]: day.isSame(today, 'day') && dayFormat !== selectedDate,
                })}
              >
                {day.format('DD')}
              </div>
              <div className={cn({
                [styles['container__today--border']]: day.isSame(today, 'day'),
                [styles['container__common--border']]: !day.isSame(today, 'day'),
              })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
