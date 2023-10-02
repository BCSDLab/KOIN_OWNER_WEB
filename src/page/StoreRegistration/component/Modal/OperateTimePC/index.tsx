import TimePicker from 'page/StoreRegistration/component/TimePicker';
import WEEK from 'utils/constants/week';
import styles from './OperateTimePC.module.scss';

export default function OperateTimePC() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>요일</th>
          <th>시간</th>
          <th>휴무</th>
        </tr>
      </thead>
      <tbody>
        {WEEK.map((day) => (
          <tr className={styles.table__data} key={day}>
            <td>{day}</td>
            <td className={styles['table__time-picker']}>
              <TimePicker />
              ~
              <TimePicker />
            </td>
            <td><input type="checkbox" className={styles.table__checkbox} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
