import {
  useRef,
  useState,
  useEffect,
  UIEvent,
  CSSProperties,
  useCallback,
} from 'react';
import { WEEK } from 'utils/constant/week';
import useModalStore, { OperatingTime } from 'store/modalStore';
import cn from 'utils/ts/className';
import { HOURS, MINUTES } from 'utils/constant/time';
import styles from './TimeDialPicker.module.scss';

const BUTTON_HEIGHT = 40;
const VISIBLE_COUNT = 3;

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const debouncedFunction = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
  debouncedFunction.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debouncedFunction;
}

function getCenterPositionFromIndex(index: number) {
  return index * BUTTON_HEIGHT;
}

function getIndexFromOffset(offsetY: number) {
  return Math.round(offsetY / BUTTON_HEIGHT);
}

function makeInfiniteArray(values: string[], multiply = 3) {
  const result: string[] = [];
  for (let i = 0; i < multiply; i += 1) {
    result.push(...values);
  }
  return result;
}

function fixScrollPosition(currentIndex: number, originalLength: number, multiplied: number) {
  const totalLength = originalLength * multiplied;
  let fixedIndex = currentIndex;
  if (fixedIndex < originalLength) {
    fixedIndex += originalLength;
  } else if (fixedIndex >= originalLength * (multiplied - 1)) {
    fixedIndex -= originalLength;
  }
  return Math.max(0, Math.min(fixedIndex, totalLength - 1));
}

interface ScrollTimePickerProps {
  initialIndex: number;
  onChange: (newIndex: number) => void;
  items: string[];
  visibleCount?: number;
  itemHeight?: number;
  style?: CSSProperties;
}

function ScrollTimePicker({
  initialIndex,
  onChange,
  items,
  visibleCount = VISIBLE_COUNT,
  itemHeight = BUTTON_HEIGHT,
  style,
}: ScrollTimePickerProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const multiplied = 3;
  const infiniteItems = makeInfiniteArray(items, multiplied);
  const centerOffset = ((visibleCount - 1) / 2) * itemHeight;
  const [selectedInfiniteIndex, setSelectedInfiniteIndex] = useState(items.length + initialIndex);
  const handleScrollStop = debounce((offsetY: number) => {
    let idx = getIndexFromOffset(offsetY + centerOffset);
    idx = fixScrollPosition(idx, items.length, multiplied);
    setSelectedInfiniteIndex(idx);
    const realIndex = idx % items.length;
    onChange(realIndex);
    if (listRef.current) {
      listRef.current.scrollTop = getCenterPositionFromIndex(idx) - centerOffset;
    }
  }, 100);
  function onScroll(e: UIEvent<HTMLDivElement>) {
    handleScrollStop.cancel();
    const offsetY = e.currentTarget.scrollTop;
    handleScrollStop(offsetY);
  }
  function onScrollEnd(e: UIEvent<HTMLDivElement>) {
    const offsetY = e.currentTarget.scrollTop;
    handleScrollStop(offsetY);
  }
  useEffect(() => {
    if (listRef.current) {
      const startIndex = items.length + initialIndex;
      listRef.current.scrollTop = getCenterPositionFromIndex(startIndex) - centerOffset;
    }
  }, [initialIndex, items, centerOffset]);
  const containerHeight = itemHeight * visibleCount;
  return (
    <div
      role="listbox"
      tabIndex={0}
      className={`${styles.scrollable}`}
      style={{
        ...style,
        height: containerHeight,
      }}
      ref={listRef}
      onScroll={onScroll}
      onMouseUp={onScrollEnd}
    >
      {infiniteItems.map((item, idx) => {
        const isSelected = idx === selectedInfiniteIndex;
        return (
          <div
            style={{
              height: itemHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isSelected ? '#000' : '#CACACA',
              fontWeight: isSelected ? 'bold' : 'normal',
              borderTop: isSelected ? '1px solid #E1E1E1' : 'none',
              borderBottom: isSelected ? '1px solid #E1E1E1' : 'none',
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

interface TimeDialPickerProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function TimeDialPicker({ setStep }: TimeDialPickerProps) {
  // const { shopClosedState } = useModalStore();
  const [openHourIndex, setOpenHourIndex] = useState(0);
  const [openMinuteIndex, setOpenMinuteIndex] = useState(0);
  const [closeHourIndex, setCloseHourIndex] = useState(0);
  const [closeMinuteIndex, setCloseMinuteIndex] = useState(0);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const handleDayClick = useCallback((day: string) => {
    setSelectedDays(
      (prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]),
    );
  }, []);
  function handleAdd() {
    const openHour = openHourIndex;
    const openMin = openMinuteIndex * 10;
    const closeHour = closeHourIndex;
    const closeMin = closeMinuteIndex * 10;
    const openTimeString = `${String(openHour).padStart(2, '0')}:${String(openMin).padStart(2, '0')}`;
    const closeTimeString = `${String(closeHour).padStart(2, '0')}:${String(closeMin).padStart(2, '0')}`;

    useModalStore.setState((prev) => {
      // 기존 상태를 복사하고 선택된 날짜에 대해서만 업데이트
      const newOpenTimeState: OperatingTime = { ...prev.openTimeState };
      const newCloseTimeState: OperatingTime = { ...prev.closeTimeState };
      const newShopClosedState = { ...prev.shopClosedState };

      WEEK.forEach((day) => {
        if (selectedDays.includes(day)) {
          newOpenTimeState[day] = openTimeString;
          newCloseTimeState[day] = closeTimeString;
          newShopClosedState[day] = false;
        }
      });

      return {
        ...prev,
        openTimeState: newOpenTimeState,
        closeTimeState: newCloseTimeState,
        shopClosedState: newShopClosedState,
      };
    });

    setStep(0);
  }

  return (
    <div className={styles.container}>
      <div className={styles['day-picker-container']}>
        {WEEK.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(day)}
              className={cn({
                [styles.dayButton]: true,
                [styles.dayButtonActive]: isSelected,
                [styles.dayButtonSat]: day === '토',
                [styles.dayButtonSun]: day === '일',
              })}
            >
              {day}
            </button>
          );
        })}

      </div>
      <div className={styles['time-picker-container']}>
        <div className={styles['time-picker']}>
          <div className={styles['time-picker__label']}>개점 시간</div>
          <div className={styles['time-picker__dial']}>
            <ScrollTimePicker
              initialIndex={openHourIndex}
              onChange={(idx) => setOpenHourIndex(idx)}
              items={HOURS}
            />
            <ScrollTimePicker
              initialIndex={openMinuteIndex}
              onChange={(idx) => setOpenMinuteIndex(idx)}
              items={MINUTES}
            />
          </div>
        </div>
        <div className={styles['time-picker']}>
          <div className={styles['time-picker__label']}>폐점 시간</div>
          <div className={styles['time-picker__dial']}>
            <ScrollTimePicker
              initialIndex={closeHourIndex}
              onChange={(idx) => setCloseHourIndex(idx)}
              items={HOURS}
            />
            <ScrollTimePicker
              initialIndex={closeMinuteIndex}
              onChange={(idx) => setCloseMinuteIndex(idx)}
              items={MINUTES}
            />
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <button
          className={styles.cancel}
          type="button"
          onClick={() => setStep(0)}
        >
          취소
        </button>
        <button
          className={styles.add}
          type="button"
          onClick={handleAdd}
        >
          추가하기
        </button>
      </div>
    </div>
  );
}
