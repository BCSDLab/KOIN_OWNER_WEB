import { useState } from 'react';
import { createPortal } from 'react-dom';
import Calendar from 'react-calendar';
import { format, getTime, isSameDay } from 'date-fns';
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

function parseDateObj(dateObj?: DateObj) {
  if (!dateObj) return null;
  return new Date(
    parseInt(dateObj.year, 10),
    parseInt(dateObj.month, 10) - 1,
    parseInt(dateObj.date, 10),
  );
}

function formatDateObj(date: Date): DateObj {
  return {
    year: String(date.getFullYear()),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    date: String(date.getDate()).padStart(2, '0'),
  };
}

function isInRange(date: Date, start: Date, end: Date) {
  const t = getTime(date);
  return t >= getTime(start) && t <= getTime(end);
}

export default function Calender({
  onClose,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  whichDate,
}: CalenderProps) {
  const parsedStartDate = parseDateObj(startDate);
  const parsedEndDate = parseDateObj(endDate);

  const initialFocus = parsedStartDate || parsedEndDate || new Date();
  const [currentDate, setCurrentDate] = useState<Date>(initialFocus);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  const {
    setTrue: openYearMonthSelectModal,
    setFalse: closeYearMonthSelectModal,
    value: isYearMonthSelectModalOpen,
  } = useBooleanState(false);

  const handleClickDay = (clickedDate: Date) => {
    if (whichDate === 'start') {
      setStartDate(formatDateObj(clickedDate));
      return;
    }

    if (whichDate === 'end') {
      if (!parsedStartDate) {
        showToast('info', '먼저 시작일을 선택해 주세요.');
        return;
      }
      if (clickedDate < parsedStartDate) {
        showToast('info', '시작일 이후 날짜만 선택할 수 있습니다.');
        return;
      }
      setEndDate(formatDateObj(clickedDate));
    }
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
    onClose();
  };

  const getTileClass = (date: Date) => {
    if (!parsedStartDate && !parsedEndDate) return undefined;

    if (whichDate === 'start') {
      if (parsedStartDate && getTime(parsedStartDate) === getTime(date)) {
        return 'react-calendar__tile--rangeStart react-calendar__tile--active';
      }
      return undefined;
    }

    if (whichDate === 'end' && parsedStartDate && parsedEndDate) {
      const start = parsedStartDate;
      const end = parsedEndDate;
      if (getTime(date) === getTime(start)) {
        return 'react-calendar__tile--rangeStart react-calendar__tile--active';
      }
      if (getTime(date) === getTime(end)) {
        return 'react-calendar__tile--rangeEnd react-calendar__tile--active';
      }
      if (isInRange(date, start, end) && getTime(date) !== getTime(end)) {
        return 'react-calendar__tile--active';
      }
    }
    return undefined;
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
        <div className={styles.content__title}>이벤트/공지 등록 기간을 설정해 주세요.</div>

        <div className={styles['custom-nav']}>
          <button type="button" onClick={handlePrevMonth} className={styles['custom-nav__button']}>
            <PreIcon />
          </button>
          <button
            type="button"
            onClick={handleHeaderClick}
            className={styles['custom-nav__label']}
          >
            {format(new Date(year, month - 1), 'yyyy년 M월')}
          </button>
          <button type="button" onClick={handleNextMonth} className={styles['custom-nav__button']}>
            <NextIcon />
          </button>
        </div>

        <Calendar
          calendarType="gregory"
          locale="ko-KR"
          selectRange={false}
          onClickDay={handleClickDay}
          activeStartDate={new Date(year, month - 1)}
          prevLabel={null}
          nextLabel={null}
          prev2Label={null}
          next2Label={null}
          className="custom-calendar"
          tileClassName={({ date, view }) => {
            if (view !== 'month') return undefined;
            return getTileClass(date);
          }}
          tileContent={({ date, view }) => {
            if (view !== 'month') return null;
            if (parsedStartDate && isSameDay(date, parsedStartDate)) {
              return <div className={styles['date-condition']}>시작일</div>;
            }
            if (parsedEndDate && isSameDay(date, parsedEndDate)) {
              return <div className={styles['date-condition']}>종료일</div>;
            }
            return null;
          }}
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
