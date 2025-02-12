// import TimePicker from 'page/ShopRegistration/component/TimePicker';
// import { WEEK } from 'utils/constant/week';
import { createPortal } from 'react-dom';
// import useModalStore, { OperatingTime } from 'store/modalStore';
// import cn from 'utils/ts/className';

import TimeDialPicker from 'component/common/TimeDialPicker';
import styles from './OperateTimeMobile.module.scss';

interface OperateTimeMobileProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function OperateTimeMobile({ isOpen, closeModal }: OperateTimeMobileProps) {
  // const { shopClosedState } = useModalStore();

  // const handleShopClosedChange = (day: typeof WEEK[number]) => {
  //   useModalStore.setState((prev) => {
  //     const newState: {
  //       openTimeState: OperatingTime;
  //       closeTimeState: OperatingTime;
  //       shopClosedState: { [key: string]: boolean }
  //     } = {
  //       ...prev,
  //       shopClosedState: {
  //         ...prev.shopClosedState,
  //         [day]: !prev.shopClosedState[day],
  //       },
  //     };
  //     if (prev.shopClosedState[day] && !newState.shopClosedState[day]) {
  //       newState.openTimeState[day] = '00:00';
  //       newState.closeTimeState[day] = '00:00';
  //     }
  //     return newState;
  //   });
  // };

  if (!isOpen) return null;
  return createPortal(
    <div
      className={styles.wrapper}
      role="button"
      tabIndex={0}
      onClick={closeModal}
      onKeyDown={(e) => e.key === 'Escape' && closeModal()}
    >
      <div
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className={styles.content}>
          <div className={styles.content__title}>
            운영시간 설정
          </div>
          <TimeDialPicker />
          {/* <table className={styles.table}>
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
                      onChange={() => handleShopClosedChange(day)}
                      className={styles.table__checkbox}
                      checked={shopClosedState[day]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <div className={styles.table__button}>
            <button className={styles.cancel} type="button" onClick={closeModal}>
              취소
            </button>
            <button className={styles.add} type="button" onClick={closeModal}>
              추가하기
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
