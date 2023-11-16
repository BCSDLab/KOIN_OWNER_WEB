import TimePicker from 'page/ShopRegistration/component/TimePicker';
import WEEK from 'utils/constant/week';
import useModalStore from 'store/modalStore';
import cn from 'utils/ts/className';
import styles from './OperateTimePC.module.scss';

export default function OperateTimePC() {
  const { shopClosedState, setShopClosedState } = useModalStore();

  const handleChangeShopClosed = (day: string) => {
    setShopClosedState({
      ...shopClosedState,
      [day]: !shopClosedState[day],
    });
  };
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
            <td className={cn({
              [styles['table__time-picker']]: true,
              [styles['table__time-picker--selected']]: shopClosedState[day],
            })}
            >
              <TimePicker operatingDay={day} isOpenTimePicker />
              {' ~ '}
              <TimePicker operatingDay={day} isOpenTimePicker={false} />
            </td>
            <td>
              <input
                type="checkbox"
                className={styles.table__checkbox}
                onChange={() => handleChangeShopClosed(day)}
                checked={shopClosedState[day]}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
