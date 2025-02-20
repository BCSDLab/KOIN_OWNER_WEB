import { createPortal } from 'react-dom';
import DeleteIcon from 'assets/svg/myshop/time-delete-icon.svg?react';
import AddTimeIcon from 'assets/svg/myshop/add-time-icon.svg?react';
import TimeDialPicker from 'component/common/TimeDialPicker';
import { useState } from 'react';
import useModalStore from 'store/modalStore';
import { WEEK } from 'utils/constant/week';
import styles from './OperateTimeMobile.module.scss';

interface OperateTimeMobileProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function OperateTimeMobile({ isOpen, closeModal }: OperateTimeMobileProps) {
  const {
    openTimeState,
    closeTimeState,
    shopClosedState,
    setShopClosedState,
  } = useModalStore();
  const [step, setStep] = useState(0);

  function handleSetHoliday(days: string[]) {
    const newClosed = { ...shopClosedState };
    days.forEach((day) => {
      newClosed[day] = true;
    });
    setShopClosedState(newClosed);
  }

  /**
   * 휴무/운영 요일을 div 배열로 만들어 반환
   */
  function matchDays() {
    const closedDays = WEEK.filter((day) => shopClosedState[day]);
    const closedDaysLine = closedDays.length > 0
      ? `${closedDays.join(', ')} : `
      : '';

    const openDays = WEEK.filter((day) => !shopClosedState[day]);
    const groupedOpenTimes: Record<string, string[]> = {};

    openDays.forEach((day) => {
      const open = openTimeState[day] || '00:00';
      const close = closeTimeState[day] || '00:00';
      const timeKey = `${open} ~ ${close}`;

      if (!groupedOpenTimes[timeKey]) {
        groupedOpenTimes[timeKey] = [];
      }
      groupedOpenTimes[timeKey].push(day);
    });

    const itemEls: JSX.Element[] = [];

    if (closedDaysLine) {
      itemEls.push(
        <div key="closedDays" className={styles.item}>
          <div className={styles.item__time}>
            {closedDaysLine}
            <span className={styles['item__time--close']}>휴무</span>
          </div>
          <DeleteIcon />
        </div>,
      );
    }

    Object.entries(groupedOpenTimes).forEach(([timeKey, daysArr]) => {
      itemEls.push(
        <div key={timeKey} className={styles.item}>
          <div className={styles.item__time}>
            {daysArr.join(', ')}
            {' '}
            :
            <span className={styles['item__time--open']}>{timeKey}</span>
          </div>
          <DeleteIcon
            onClick={() => handleSetHoliday(daysArr)}
            className={styles.deleteIcon}
          />
        </div>,
      );
    });

    return itemEls;
  }

  if (!isOpen) return null;

  const items = matchDays();
  const itemCount = items.length;

  const maxSlots = 5;
  const emptySlotsCount = itemCount < maxSlots ? maxSlots - itemCount : 0;

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

          {step === 0 && (
            <div className={styles['time-group']}>
              <div className={styles.list}>
                {items}

                {Array.from({ length: emptySlotsCount }).map(() => (
                  <div className={styles.item}>
                    <div className={styles.item__time} />
                  </div>
                ))}
              </div>

              {itemCount < 6 && (
                <button
                  className={styles['add-button']}
                  type="button"
                  onClick={() => setStep(1)}
                >
                  설정 시간 추가
                  <AddTimeIcon />
                </button>
              )}

              <div className={styles.button}>
                <button
                  className={styles.cancel}
                  type="button"
                  onClick={() => closeModal()}
                >
                  취소
                </button>
                <button
                  className={styles.add}
                  type="button"
                  onClick={() => closeModal()}
                >
                  등록하기
                </button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <TimeDialPicker setStep={setStep} />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
