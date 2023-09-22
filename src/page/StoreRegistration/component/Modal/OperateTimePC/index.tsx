import TimePicker from 'page/StoreRegistration/component/TimePicker';
import CommonModal from 'component/common/CommonModal';
import WEEK from 'page/StoreRegistration/static/week';
import styles from './OperateTimePC.module.scss';

interface OperateTimeProps {
  isOpen: boolean;
  modalHandler: () => void;
}

export default function OperateTimePC({ isOpen, modalHandler }: OperateTimeProps) {
  if (!isOpen) return null;

  return (
    <CommonModal title="운영시간" isOpen={isOpen} modalHandler={modalHandler} modalSize="large">
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
    </CommonModal>
  );
}
