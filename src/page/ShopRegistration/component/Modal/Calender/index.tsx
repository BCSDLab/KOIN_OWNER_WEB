import { useState } from 'react';
import { createPortal } from 'react-dom';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import PreIcon from 'assets/svg/common/pre-month-arrow.svg?react';
import NextIcon from 'assets/svg/common/next-month-arrow.svg?react';
import showToast from 'utils/ts/showToast';
import useBooleanState from 'utils/hooks/useBooleanState';
import styles from './Calender.module.scss';
import './calender.css';
import YearMonthSelectModal from './component/YearMonthSelectModal';

interface DateObj {
  year: string;
  month: string;
  date: string;
}

interface CalenderProps {
  onClose: () => void;
  startDate?: DateObj;
  endDate?: DateObj;
  setStartDate: (value: DateObj) => void;
  setEndDate: (value: DateObj) => void;
  whichDate: 'start' | 'end' | null;
}

export default function Calender({
  onClose,
  // startDate,
  // endDate,
  setStartDate,
  setEndDate,
  whichDate,
}: CalenderProps) {
  const initialCalendarValue: [Date | null, Date | null] | null = null;
  // eslint-disable-next-line max-len
  const [selectedValue, setSelectedValue] = useState<[Date | null, Date | null] | null>(initialCalendarValue);

  // Calendar가 보여줄 현재 연,월 상태(모달로 바꿀 때도 동기화)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const {
    setTrue: openYearMonthSelectModal,
    setFalse: closeYearMonthSelectModal,
    value: isYearMonthSelectModalOpen,
  } = useBooleanState(false);

  const handleDateChange = (value: Date | [Date | null, Date | null] | null) => {
    setSelectedValue(value as [Date | null, Date | null]);
  };

  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1);
    prev.setMonth(prev.getMonth() - 1);
    setYear(prev.getFullYear());
    setMonth(prev.getMonth() + 1);
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(year, month - 1);
    next.setMonth(next.getMonth() + 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const handleHeaderClick = () => {
    openYearMonthSelectModal();
  };

  const handleSubmit = () => {
    if (selectedValue === null) {
      showToast('info', '날짜를 선택해주세요.');
      return;
    }
    const [start, end] = selectedValue;
    if (start && end) {
      const startObj: DateObj = {
        year: String(start.getFullYear()),
        month: String(start.getMonth() + 1).padStart(2, '0'),
        date: String(start.getDate()).padStart(2, '0'),
      };
      const endObj: DateObj = {
        year: String(end.getFullYear()),
        month: String(end.getMonth() + 1).padStart(2, '0'),
        date: String(end.getDate()).padStart(2, '0'),
      };
      setStartDate(startObj);
      setEndDate(endObj);
    } else if (start && !end) {
      const dateObj: DateObj = {
        year: String(start.getFullYear()),
        month: String(start.getMonth() + 1).padStart(2, '0'),
        date: String(start.getDate()).padStart(2, '0'),
      };
      if (whichDate === 'start') {
        setStartDate(dateObj);
      } else if (whichDate === 'end') {
        setEndDate(dateObj);
      }
    } else {
      showToast('info', '날짜를 다시 선택해주세요.');
      return;
    }
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
        className={`${styles.container} ${styles.calendarWrapper}`}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className={styles.content__title}>
          이벤트/공지 등록 기간을 설정해 주세요.
        </div>
        <div className={styles['custom-nav']}>
          <button type="button" onClick={handlePrevMonth} className={styles['custom-nav__button']}>
            <PreIcon />
          </button>
          <button type="button" onClick={handleHeaderClick} className={styles['custom-nav__label']}>
            {format(new Date(year, month - 1), 'yyyy년 M월')}
          </button>
          <button type="button" onClick={handleNextMonth} className={styles['custom-nav__button']}>
            <NextIcon />
          </button>
        </div>
        <Calendar
          calendarType="gregory"
          onChange={handleDateChange}
          selectRange
          returnValue="range"
          value={selectedValue}
          defaultValue={null}
          locale="ko-KR"
          prevLabel={null}
          nextLabel={null}
          prev2Label={null}
          next2Label={null}
          activeStartDate={new Date(year, month - 1)}
          className="custom-calendar"
        />
        <div className={styles.button__container}>
          <button type="button" className={styles.button__cancel} onClick={onClose}>
            취소
          </button>
          <button type="button" className={styles.button__submit} onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      </div>

      {isYearMonthSelectModalOpen && (
        <YearMonthSelectModal
          onClose={closeYearMonthSelectModal}
          year={year}
          month={month}
          onSubmit={(selectedYear, selectedMonth) => {
            setYear(selectedYear);
            setMonth(selectedMonth);
            const newDate = new Date(selectedYear, selectedMonth - 1);
            setCurrentDate(newDate);
          }}
        />
      )}
    </div>,
    document.body,
  );
}
