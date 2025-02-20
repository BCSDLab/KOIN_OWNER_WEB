/* eslint-disable max-len */
import {
  useState, useRef, useEffect, UIEvent, CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './YearMonthSelectModal.module.scss';

export const YEAR = ['2023', '2024', '2025', '2026', '2027'];
export const MONTH = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

interface YearMonthSelectModalProps {
  onClose: () => void;
  year: number;
  month: number;
  onSubmit: (selectedYear: number, selectedMonth: number) => void;
}

const BUTTON_HEIGHT = 40;
const VISIBLE_COUNT = 3;

function makeInfiniteArray(values: string[], multiply = 3) {
  const result: string[] = [];
  for (let i = 0; i < multiply; i += 1) {
    result.push(...values);
  }
  return result;
}

function getCenterPositionFromIndex(index: number) {
  return index * BUTTON_HEIGHT;
}

function getIndexFromOffset(offsetY: number) {
  return Math.round(offsetY / BUTTON_HEIGHT);
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

export default function YearMonthSelectModal({
  onClose,
  year,
  month,
  onSubmit,
}: YearMonthSelectModalProps) {
  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);

  const multiplied = 3;
  const infiniteYears = makeInfiniteArray(YEAR, multiplied);
  const infiniteMonths = makeInfiniteArray(MONTH, multiplied);

  const defaultYearIndex = YEAR.findIndex((y) => y === String(year)) + YEAR.length;
  const defaultMonthIndex = MONTH.findIndex((m) => m === String(month).padStart(2, '0')) + MONTH.length;

  const [selectedInfiniteYearIndex, setSelectedInfiniteYearIndex] = useState(defaultYearIndex);
  const [selectedInfiniteMonthIndex, setSelectedInfiniteMonthIndex] = useState(defaultMonthIndex);
  const [tempSelectedYear, setTempSelectedYear] = useState(year);
  const [tempSelectedMonth, setTempSelectedMonth] = useState(month);

  const centerOffset = ((VISIBLE_COUNT - 1) / 2) * BUTTON_HEIGHT;
  const containerHeight = BUTTON_HEIGHT * VISIBLE_COUNT;

  const handleYearScroll = (e: UIEvent<HTMLDivElement>) => {
    const offset = e.currentTarget.scrollTop;
    let idx = getIndexFromOffset(offset + centerOffset);
    idx = fixScrollPosition(idx, YEAR.length, multiplied);
    setSelectedInfiniteYearIndex(idx);
    const realYear = YEAR[idx % YEAR.length];
    setTempSelectedYear(Number(realYear));
  };

  const handleMonthScroll = (e: UIEvent<HTMLDivElement>) => {
    const offset = e.currentTarget.scrollTop;
    let idx = getIndexFromOffset(offset + centerOffset);
    idx = fixScrollPosition(idx, MONTH.length, multiplied);
    setSelectedInfiniteMonthIndex(idx);
    const realMonth = MONTH[idx % MONTH.length];
    setTempSelectedMonth(Number(realMonth));
  };

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.scrollTop = getCenterPositionFromIndex(selectedInfiniteYearIndex) - centerOffset;
    }
    if (monthRef.current) {
      monthRef.current.scrollTop = getCenterPositionFromIndex(selectedInfiniteMonthIndex) - centerOffset;
    }
  }, [selectedInfiniteYearIndex, selectedInfiniteMonthIndex, centerOffset]);

  const handleConfirm = () => {
    onSubmit(tempSelectedYear, tempSelectedMonth);
    onClose();
  };

  return createPortal(
    <div
      className={styles.wrapper}
      role="button"
      tabIndex={0}
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        className={`${styles.container} ${styles.modalContainer}`}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className={styles.select}>
          {tempSelectedYear}
          년
          {String(tempSelectedMonth).padStart(2, '0')}
          월
        </div>
        <div className={styles.dialContainer}>
          <div className={styles.dialWrapper}>
            <div
              className={styles.dial}
              style={{ height: containerHeight } as CSSProperties}
              ref={yearRef}
              onScroll={handleYearScroll}
            >
              {infiniteYears.map((yearValue, idx) => {
                const isActive = idx === selectedInfiniteYearIndex;
                return (
                  <div
                    className={`${styles.dialItem} ${isActive ? styles.active : ''}`}
                    style={{ height: BUTTON_HEIGHT } as CSSProperties}
                  >
                    {yearValue}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.dialWrapper}>
            <div
              className={styles.dial}
              style={{ height: containerHeight } as CSSProperties}
              ref={monthRef}
              onScroll={handleMonthScroll}
            >
              {infiniteMonths.map((monthValue, idx) => {
                const isActive = idx === selectedInfiniteMonthIndex;
                return (
                  <div
                    className={`${styles.dialItem} ${isActive ? styles.active : ''}`}
                    style={{ height: BUTTON_HEIGHT } as CSSProperties}
                  >
                    {monthValue}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            취소
          </button>
          <button type="button" className={styles.submit} onClick={handleConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
