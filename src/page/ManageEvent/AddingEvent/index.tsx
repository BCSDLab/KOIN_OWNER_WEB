import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useAddEvent } from 'query/event';
import { useNavigate, useParams } from 'react-router-dom';
import { FileResponse, getOwnerUrl } from 'api/uploadFile';
import axios from 'axios';
import showToast from 'utils/ts/showToast';
import Delete from 'assets/svg/myshop/delete.svg?react';
import cn from 'utils/ts/className';
import styles from 'page/ManageEvent/index.module.scss';
import CheckBox from 'assets/svg/common/checkbox.svg?react';
import Cancel from 'assets/svg/common/cancel.svg?react';
import Picture from 'assets/svg/common/picture.svg?react';
import PictureDisalbe from 'assets/svg/common/picture-disable.svg?react';
import CalenderIcon from 'assets/svg/common/calender.svg?react';
import { createPortal } from 'react-dom';
import AlertModal from 'component/common/Modal/alertModal';
import useLogger from 'utils/hooks/useLogger';
import ROUTES from 'static/routes';
import useBooleanState from 'utils/hooks/useBooleanState';
import Calender from 'page/ShopRegistration/component/Modal/Calender';

/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/label-has-associated-control */

export const modules = {
  toolbar: [
    ['bold'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};
const today = new Date();
const formatNum = (num: number) => String(num).padStart(2, '0');

const initialState = {
  title: '',
  content: '',
  thumbnail_image: [],
  start_date: {
    year: today.getFullYear().toString(),
    month: formatNum(today.getMonth() + 1),
    date: formatNum(today.getDate()),
  },
  end_date: {
    year: today.getFullYear().toString(),
    month: formatNum(today.getMonth() + 1),
    date: formatNum(today.getDate()),
  },
};

export type Change = 'year' | 'month' | 'date';

type Date = {
  year: string,
  month: string,
  date: string,
};

export const validateDate = (date: Date) => date.year.length === 0
  || date.month.length === 0
  || date.date.length === 0;

export interface EventInfo {
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

interface FileInfo {
  file: File;
  presignedUrl: string;
}

export const uploadImage = async ({ presignedUrl, file }: FileInfo) => {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': 'image/jpeg, image/png, image/svg+xml, image/webp',
    },
  });
};

export interface ImageList {
  presigned: FileResponse[];
  file: FileList | null;
}

export const initialError = {
  title: false,
  content: false,
  date: false,
};

export default function AddingEvent() {
  const [eventInfo, setEventInfo] = useState<EventInfo>(initialState);
  const [error, setError] = useState(initialError);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const param = useParams();

  const { mutate: addEvent, isPending } = useAddEvent(param.id!);
  const navigate = useNavigate();
  const logger = useLogger();
  const {
    setTrue: openCalenderModal,
    setFalse: closeCalendeModal,
    value: isCalendeModalOpen,
  } = useBooleanState(false);

  const [whichDate, setWhichDate] = useState<'start' | 'end' | null>(null);

  const changeInput = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    type: 'title' | 'start' | 'end' | 'content',
    change?: Change,
  ) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (type === 'title' && e.target.value.length <= 25) {
      setEventInfo({ ...eventInfo, title: e.target.value });
      setError({ ...error, title: false });
    }
    if (type === 'content' && e.target.value.length <= 500) {
      setEventInfo({ ...eventInfo, content: e.target.value });
      setError({ ...error, content: false });
    }
    if (type === 'start') {
      if (change === 'year' && e.target.value.length <= 4) {
        setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, [change!]: value } });
      }
      if (change !== 'year' && e.target.value.length <= 2) {
        setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, [change!]: value } });
      }
      setError({ ...error, date: false });
    }
    if (type === 'end') {
      if (change === 'year' && e.target.value.length <= 4) {
        setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, [change!]: value } });
      }
      if (change !== 'year' && e.target.value.length <= 2) {
        setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, [change!]: value } });
      }
      setError({ ...error, date: false });
    }
  };

  const validation = () => {
    let flag = false;
    if (eventInfo.title.length === 0) {
      setError((prevError) => ({ ...prevError, title: true }));
      flag = true;
    }
    if (eventInfo.content.length === 0) {
      setError((prevError) => ({ ...prevError, content: true }));
      flag = true;
    }
    if (validateDate({
      year: eventInfo.start_date.year,
      month: eventInfo.start_date.month,
      date: eventInfo.start_date.date,
    }) || validateDate({
      year: eventInfo.end_date.year,
      month: eventInfo.end_date.month,
      date: eventInfo.end_date.date,
    })) {
      setError((prevError) => ({ ...prevError, date: true }));
      flag = true;
    }
    return flag;
  };

  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file && file.length > 0) {
      if (file.length + eventInfo.thumbnail_image.length > 3) {
        showToast('error', '이미지는 3개까지 등록할 수 있습니다');
        return;
      }

      for (let i = 0; i < file.length; i += 1) {
        getOwnerUrl({
          content_length: file[i].size,
          content_type: file[i].type,
          file_name: file[i].name,
        }).then((res) => {
          uploadImage({ presignedUrl: res.data.pre_signed_url, file: file[i] })
            .then(() => setEventInfo(
              { ...eventInfo, thumbnail_image: [...eventInfo.thumbnail_image, res.data.file_url] },
            ));
        });
      }
    }
  };

  const postEvent = () => {
    if (validation()) return;

    const startDate = `${eventInfo.start_date.year}-${eventInfo.start_date.month.padStart(2, '0')}-${eventInfo.start_date.date.padStart(2, '0')}`;
    const endDate = `${eventInfo.end_date.year}-${eventInfo.end_date.month.padStart(2, '0')}-${eventInfo.end_date.date.padStart(2, '0')}`;

    const requestData = {
      title: eventInfo.title,
      content: eventInfo.content,
      start_date: startDate,
      end_date: endDate,
      thumbnail_images: eventInfo.thumbnail_image,
    };

    addEvent(requestData);
    logger.actionEventClick({ actionTitle: 'OWNER', title: 'add_event_register', value: '이벤트 추가' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.event}>
        <div>
          <p className={styles.event__paragraph}>사진</p>
          <div className={styles.event__divide}>
            <small className={styles.event__count}>이벤트/공지와 관련된 사진을 올려보세요.</small>
            <small className={
              cn({
                [styles.event__count]: true,
                [styles['event__count--full']]: eventInfo.thumbnail_image.length === 3,
              })
            }
            >
              {`${eventInfo.thumbnail_image.length} / 3`}
            </small>
          </div>
          {eventInfo.thumbnail_image.length > 0 && (
            <div className={styles.event__images}>
              {
                eventInfo.thumbnail_image.map((src, id) => {
                  if (typeof src === 'string') {
                    return (
                      <div className={styles['event__each-image']}>
                        <img src={src} alt="미리보기" className={styles.event__image} />
                        <button
                          type="button"
                          className={styles['event__each-image--delete']}
                          onClick={() => {
                            // 이미지 삭제
                            const deletedPreview = eventInfo.thumbnail_image.filter(
                              (item, idx) => idx !== id,
                            );
                            setEventInfo({ ...eventInfo, thumbnail_image: deletedPreview });
                          }}
                        >
                          <Delete />
                        </button>
                      </div>
                    );
                  }
                  return '';
                })
              }
            </div>
          )}
          <label
            htmlFor="fileUpload"
            className={
              cn({
                [styles.event__upload]: true,
                [styles['event__upload--disable']]: eventInfo.thumbnail_image.length === 3,
              })
            }
          >
            {eventInfo.thumbnail_image.length === 3 ? <PictureDisalbe /> : <Picture />}
            사진 등록하기
          </label>
          <input
            type="file"
            id="fileUpload"
            placeholder="사진 등록하기"
            accept="image/*"
            multiple
            maxLength={3}
            onChange={handleImages}
            style={{ display: 'none' }}
            disabled={eventInfo.thumbnail_image.length === 3}
          />
        </div>
        <div>
          <div className={styles.event__divide}>
            <p className={styles.event__paragraph}>제목</p>
            <small className={
              cn({
                [styles.event__count]: true,
                [styles['event__count--full']]: eventInfo.title.length === 25,
              })
            }
            >
              {`${eventInfo.title.length} / 25`}
            </small>
          </div>
          <input
            type="text"
            placeholder="이벤트 이름이 학생들에게 알림으로 전송 돼요."
            className={cn({
              [styles['error-border']]: error.title,
              [styles.event__input]: true,
            })}
            value={eventInfo.title}
            onChange={(e) => changeInput(e, 'title')}
          />
          {error.title && <div className={styles['error-message']}>필수 입력 항목입니다.</div>}
        </div>
        <div>
          <div className={styles.event__divide}>
            <p className={styles.event__paragraph}>이벤트/공지 내용</p>
            <small className={
              cn({
                [styles.event__count]: true,
                [styles['event__count--full']]: eventInfo.content.length === 500,
              })
            }
            >
              {`${eventInfo.content.length} / 500`}
            </small>
          </div>
          <div>
            <textarea
              value={eventInfo.content}
              placeholder="이벤트 내용을 입력해주세요"
              className={cn({
                [styles['error-border']]: error.content,
                [styles.event__content]: true,
              })}
              onChange={(e) => changeInput(e, 'content')}
            />
          </div>
          {error.content && <div className={styles['error-message']}>필수 입력 항목입니다.</div>}
        </div>
        <div>
          <p className={styles.event__paragraph}>이벤트/공지 등록 기간</p>
          <div className={styles['event-day']}>
            <div className={styles['event-day__paragraph']}>시작일</div>
            <button
              type="button"
              className={styles['calender-button']}
              onClick={() => {
                setWhichDate('start');
                openCalenderModal();
              }}
            >
              <div className={styles['calender-button__text']}>
                {eventInfo.start_date.year}
                /
                {eventInfo.start_date.month}
                /
                {eventInfo.start_date.date}
              </div>
              <CalenderIcon />
            </button>
          </div>
          <div className={styles['event-day']}>
            <div className={styles['event-day__paragraph']}>종료일</div>
            <button
              type="button"
              className={styles['calender-button']}
              onClick={() => {
                setWhichDate('end');
                openCalenderModal();
              }}
            >
              <div className={styles['calender-button__text']}>
                {eventInfo.end_date.year}
                /
                {eventInfo.end_date.month}
                /
                {eventInfo.end_date.date}
              </div>
              <CalenderIcon />
            </button>
          </div>
          {error.date && <div className={styles['error-message']}>필수 입력 항목입니다.</div>}
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={() => setIsAlertModalOpen(true)}>
            <Cancel />
            취소하기
          </button>
          <button type="button" className={styles.add} onClick={postEvent} disabled={isPending}>
            <CheckBox />
            등록하기
          </button>
        </div>
      </div>
      {isAlertModalOpen && createPortal(
        <AlertModal
          title={(
            <div>
              작성을
              {' '}
              <span>취소</span>
              하시겠습니까?
            </div>
          )}
          content="취소한 글은 되돌릴 수 없습니다."
          setIsOpen={setIsAlertModalOpen}
          cancelText="이어쓰기"
          acceptText="취소하기"
          callBack={() => navigate(ROUTES.Main())}
        />,
        document.body,
      )}
      {isCalendeModalOpen && (
      <Calender
        onClose={closeCalendeModal}
        setStartDate={(newStart) => setEventInfo((prev) => ({ ...prev, start_date: newStart }))}
        setEndDate={(newEnd) => setEventInfo((prev) => ({ ...prev, end_date: newEnd }))}
        whichDate={whichDate}
      />

      )}

    </div>
  );
}
