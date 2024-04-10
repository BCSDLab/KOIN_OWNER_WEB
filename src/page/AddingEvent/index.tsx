import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styles from './AddingEvent.module.scss';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    ['bold'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

const initialState = {
  title: '',
  content: '',
  thumbnail_image: [],
  start_date: {
    year: '',
    month: '',
    date: '',
  },
  end_date: {
    year: '',
    month: '',
    date: '',
  },
};

interface EventInfo {
  title: string,
  content: string,
  thumbnail_image: string[],
  start_date: {
    year: string,
    month: string,
    date: string,
  },
  end_date: {
    year: string,
    month: string,
    date: string,
  },
}

export default function AddingEvent() {
  const [eventInfo, setEventInfo] = useState<EventInfo>(initialState);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 25) setEventInfo({ ...eventInfo, title: e.target.value });
  };
  const changeStartYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, year: e.target.value } });
  };
  const changeStartMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, month: e.target.value } });
  };
  const changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, date: e.target.value } });
  };
  const changeEndYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, year: e.target.value } });
  };
  const changeEndMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, month: e.target.value } });
  };
  const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, date: e.target.value } });
  };
  const [editor, setEditor] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.event}>
        <div>
          <p className={styles.event__paragraph}>사진</p>
          <div className={styles.event__divide}>
            <small>이벤트/공지와 관련된 사진을 올려보세요.</small>
            <small className={styles.event__count}>0</small>
          </div>
          <input type="file" placeholder="사진 등록하기" />
        </div>
        <div>
          <div className={styles.event__divide}>
            <p className={styles.event__paragraph}>제목</p>
            <small className={styles.event__count}>
              {eventInfo.title.length}
              /25
            </small>
          </div>
          <input
            type="text"
            placeholder="이벤트/공지 제목을 입력해주세요."
            className={styles.event__input}
            value={eventInfo.title}
            onChange={changeTitle}
          />
        </div>
        <div>
          <div className={styles.event__divide}>
            <p className={styles.event__paragraph}>이벤트/공지 내용</p>
            <small className={styles.event__count}>0</small>
          </div>
          <div>
            <ReactQuill
              style={{ border: '5px' }}
              theme="snow"
              value={editor}
              onChange={setEditor}
              modules={modules}
              placeholder="이벤트/공지 내용을 입력해 주세요."
            />
          </div>
        </div>
        <div>
          <p className={styles.event__paragraph}>이벤트/공지 등록 기간</p>
          <div className={styles['event-day']}>
            <div className={styles['event-day__paragraph']}>시작일</div>
            <input
              placeholder="연"
              value={eventInfo.start_date.year}
              className={styles['event-day__input']}
              onChange={changeStartYear}
            />
            /
            <input
              placeholder="월"
              value={eventInfo.start_date.month}
              className={styles['event-day__input']}
              onChange={changeStartMonth}
            />
            /
            <input
              placeholder="일"
              value={eventInfo.start_date.date}
              className={styles['event-day__input']}
              onChange={changeStartDate}
            />
          </div>
          <div className={styles['event-day']}>
            <div className={styles['event-day__paragraph']}>종료일</div>
            <input
              placeholder="연"
              value={eventInfo.end_date.year}
              className={styles['event-day__input']}
              onChange={changeEndYear}
            />
            /
            <input
              placeholder="월"
              value={eventInfo.end_date.month}
              className={styles['event-day__input']}
              onChange={changeEndMonth}
            />
            /
            <input
              placeholder="일"
              value={eventInfo.end_date.date}
              className={styles['event-day__input']}
              onChange={changeEndDate}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button type="button" className={styles.cancel}>취소하기</button>
        <button type="button" className={styles.add}>등록하기</button>
      </div>
    </div>
  );
}
