import PreviousStep from 'component/common/Auth/PreviousStep';
import SubTitle from 'component/common/Auth/SubTitle';
import useStepStore from 'store/useStepStore';
import TimePicker from 'page/ShopRegistration/component/TimePicker';
import { WEEK } from 'utils/constant/week';
import { createPortal } from 'react-dom';
import useModalStore from 'store/modalStore';
import cn from 'utils/ts/className';
import styles from './OperateTimeMobile.module.scss';

interface OperateTimeMobileProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function OperateTimeMobile({ isOpen, closeModal }: OperateTimeMobileProps) {
  const step = useStepStore((state) => state.step);
  const { shopClosedState } = useModalStore();

  const handleShopClosedChange = (day: string) => {
    useModalStore.setState((prev) => ({
      ...prev,
      shopClosedState: {
        ...prev.shopClosedState,
        [day]: !prev.shopClosedState[day],
      },
    }));
  };

  if (!isOpen) return null;
  return createPortal(
    <div>
      <div className={styles.container}>
        <div className={styles['chevron-left']}>
          <PreviousStep step={step} clickEvent={closeModal} />
        </div>
        <div className={styles.content}>
          <SubTitle topTitle="가게 등록" bottomTitle="" topText="시간 설정" bottomText="" />
          <div className={styles.content__info}>평일/주말 운영시간</div>
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
                      onChange={() => handleShopClosedChange(day)}
                      className={styles.table__checkbox}
                      checked={shopClosedState[day]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.table__button}>
            <button type="button" onClick={closeModal}>
              다음
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
