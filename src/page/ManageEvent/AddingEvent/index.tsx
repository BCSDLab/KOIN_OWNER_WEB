import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAddEvent } from 'query/event';
import { useNavigate, useParams } from 'react-router-dom';
import { FileResponse, getCoopUrl } from 'api/uploadFile';
import axios from 'axios';
import showToast from 'utils/ts/showToast';
import { ReactComponent as Delete } from 'assets/svg/myshop/delete.svg';
import cn from 'utils/ts/className';
import styles from 'page/ManageEvent/index.module.scss';
import { ReactComponent as CheckBox } from 'assets/svg/common/checkbox.svg';
import { ReactComponent as Cancel } from 'assets/svg/common/cancel.svg';
import { ReactComponent as Picture } from 'assets/svg/common/picture.svg';
import { ReactComponent as PictureDisalbe } from 'assets/svg/common/picture-disable.svg';

/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/label-has-associated-control */

export const modules = {
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
  const [editor, setEditor] = useState('');
  const param = useParams();

  const { mutate: addEvent, isPending } = useAddEvent(param.id!);
  const navigate = useNavigate();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'title' | 'start' | 'end', change?: Change) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (type === 'title' && e.target.value.length <= 25) {
      setEventInfo({ ...eventInfo, title: e.target.value });
    }
    if (type === 'start') {
      if (change === 'year' && e.target.value.length <= 4) {
        setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, [change!]: value } });
      }
      if (change !== 'year' && e.target.value.length <= 2) {
        setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, [change!]: value } });
      }
    }
    if (type === 'end') {
      if (change === 'year' && e.target.value.length <= 4) {
        setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, [change!]: value } });
      }
      if (change !== 'year' && e.target.value.length <= 2) {
        setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, [change!]: value } });
      }
    }
    setError({ ...error, title: false });
  };

  const validation = () => {
    let flag = false;
    if (eventInfo.title.length === 0) {
      setError((prevError) => ({ ...prevError, title: true }));
      flag = true;
    }
    if (editor.length === 0) {
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
        getCoopUrl({
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
      content: editor,
      start_date: startDate,
      end_date: endDate,
      thumbnail_images: eventInfo.thumbnail_image,
    };

    addEvent(requestData);
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
            placeholder="이벤트/공지 제목을 입력해주세요."
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
            <small className={styles.event__count} />
          </div>
          <div>
            <ReactQuill
              theme="snow"
              value={editor}
              onChange={(e) => {
                setError({ ...error, content: false });
                return setEditor(e);
              }}
              modules={modules}
              placeholder="이벤트/공지 내용을 입력해 주세요."
              className={cn({
                [styles['error-border']]: error.content,
              })}
            />
          </div>
          {error.content && <div className={styles['error-message']}>필수 입력 항목입니다.</div>}
        </div>
        <div>
          <p className={styles.event__paragraph}>이벤트/공지 등록 기간</p>
          <div className={styles['event-day']}>
            <div className={styles['event-day__paragraph']}>시작일</div>
            <input
              placeholder="2999"
              value={eventInfo.start_date.year}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={(e) => changeInput(e, 'start', 'year')}
            />
            /
            <input
              placeholder="01"
              value={eventInfo.start_date.month}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={(e) => changeInput(e, 'start', 'month')}
            />
            /
            <input
              placeholder="01"
              value={eventInfo.start_date.date}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={(e) => changeInput(e, 'start', 'date')}
            />
          </div>
          <div className={styles['event-day']}>
            <div className={styles['event-day__paragraph']}>종료일</div>
            <input
              placeholder="2999"
              value={eventInfo.end_date.year}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={(e) => changeInput(e, 'end', 'year')}
            />
            /
            <input
              placeholder="01"
              value={eventInfo.end_date.month}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={(e) => changeInput(e, 'end', 'month')}
            />
            /
            <input
              placeholder="01"
              value={eventInfo.end_date.date}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={(e) => changeInput(e, 'end', 'date')}
            />
          </div>
          {error.date && <div className={styles['error-message']}>필수 입력 항목입니다.</div>}
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={() => navigate(-1)}>
            <Cancel />
            취소하기
          </button>
          <button type="button" className={styles.add} onClick={postEvent} disabled={isPending}>
            <CheckBox />
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
