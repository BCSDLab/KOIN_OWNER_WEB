import dayjs from 'dayjs';
import { getDayOfWeek } from 'page/Coop/hook/useGetDayOfWeek';
import styles from './Calendar.module.scss';

export default function Calendar() {
  const today = dayjs();
  const weekDays = Array.from({ length: 7 }, (_, i) => today.add(i - 3, 'day'));

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.container__week}>
          {weekDays.map((day) => (
            <div key={day.format('YYYY-MM-DD')}>
              <div>{getDayOfWeek(day.format('YYYY-MM-DD'))}</div>
            </div>
          ))}
        </div>
        <div className={styles['container__week--date']}>
          {weekDays.map((day) => (
            <div key={day.format('YYYY-MM-DD')}>
              <div>{day.format('DD')}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
