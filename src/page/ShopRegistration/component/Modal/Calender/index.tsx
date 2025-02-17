/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { createPortal } from 'react-dom';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import PreIcon from 'assets/svg/common/pre-month-arrow.svg?react';
import NextIcon from 'assets/svg/common/next-month-arrow.svg?react';
import styles from './Calender.module.scss';

interface CalenderProps {
  onClose: () => void;
  startDate?: { year: string; month: string; date: string };
  endDate?: { year: string; month: string; date: string };
  setStartDate: (value: { year: string; month: string; date: string }) => void;
  setEndDate: (value: { year: string; month: string; date: string }) => void;
}

export default function Calender({
  onClose,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: CalenderProps) {
  // 문자열 상태를 Date 객체로 변환 (없으면 undefined 반환)
  const parseDate = (
    dateObj?: { year: string; month: string; date: string },
  ): Date | undefined => {
    if (dateObj?.year && dateObj?.month && dateObj?.date) {
      return new Date(
        Number(dateObj.year),
        Number(dateObj.month) - 1,
        Number(dateObj.date),
      );
    }
    return undefined;
  };

  const startDateObj = parseDate(startDate);
  const endDateObj = parseDate(endDate);

  // react-calendar의 value는 Date 또는 [Date | null, Date | null] 타입이어야 합니다.
  // startDate만 있을 경우 [startDate, null]로 전달합니다.
  const calendarValue: Date | [Date | null, Date | null] = startDateObj
    ? endDateObj
      ? [startDateObj, endDateObj]
      : [startDateObj, null]
    : new Date();

  // onChange의 value 타입은 selectRange 사용 시 Date 또는 [Date | null, Date | null] | null 입니다.
  const handleDateChange = (
    value: Date | [Date | null, Date | null] | null,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (value === null) return;
    if (Array.isArray(value)) {
      const [start, end] = value;
      if (start) {
        setStartDate({
          year: start.getFullYear().toString(),
          month: String(start.getMonth() + 1).padStart(2, '0'),
          date: String(start.getDate()).padStart(2, '0'),
        });
      }
      if (end) {
        setEndDate({
          year: end.getFullYear().toString(),
          month: String(end.getMonth() + 1).padStart(2, '0'),
          date: String(end.getDate()).padStart(2, '0'),
        });
      }
    } else {
      // 단일 날짜 선택 시
      setStartDate({
        year: value.getFullYear().toString(),
        month: String(value.getMonth() + 1).padStart(2, '0'),
        date: String(value.getDate()).padStart(2, '0'),
      });
    }
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
        <Calendar
          onChange={handleDateChange}
          selectRange
          value={calendarValue}
          locale="ko-KR"
          prevLabel={<PreIcon />}
          nextLabel={<NextIcon />}
          prev2Label={null}
          next2Label={null}
          navigationLabel={({ date }) => (
            <span>{format(date, 'yyyy년 M월')}</span>
          )}
          className={styles.customCalendar}
        />
      </div>
    </div>,
    document.body,
  );
}
