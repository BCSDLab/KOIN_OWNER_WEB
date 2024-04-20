import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  initialError, EventInfo, modules, uploadImage,
} from 'page/ManageEvent/AddingEvent/index';
import ReactQuill from 'react-quill';
import showToast from 'utils/ts/showToast';
import { getCoopUrl } from 'api/uploadFile';
import { ReactComponent as Delete } from 'assets/svg/myshop/delete.svg';
import cn from 'utils/ts/className';
import styles from 'page/ManageEvent/index.module.scss';
import { useModifyEvent } from 'query/event';

/* eslint-disable jsx-a11y/label-has-associated-control */

interface Props {
  content: string,
  event_id: number,
  shop_id: number,
  title: string,
  thumbnail_images: string[],
  start_date: string,
  end_date: string,
}

export default function ModifyEvent() {
  const location = useLocation();
  const event: Props = location.state;

  const initialState = {
    title: event.title,
    content: event.content,
    thumbnail_image: event.thumbnail_images,
    start_date: {
      year: event.start_date.slice(0, 4),
      month: event.start_date.slice(5, 7),
      date: event.start_date.slice(8, 10),
    },
    end_date: {
      year: event.end_date.slice(0, 4),
      month: event.end_date.slice(5, 7),
      date: event.end_date.slice(8, 10),
    },
  };

  const [eventInfo, setEventInfo] = useState<EventInfo>(initialState);
  const [error, setError] = useState(initialError);
  const [editor, setEditor] = useState(event.content);

  const { mutate: modifyEvent, isPending } = useModifyEvent(event.shop_id, event.event_id);
  const navigate = useNavigate();

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 25) setEventInfo({ ...eventInfo, title: e.target.value });
    setError({ ...error, title: false });
  };
  const changeStartYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 4) {
      setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, year: value } });
    }
    setError({ ...error, date: false });
  };
  const changeStartMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 2) {
      setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, month: value } });
    }
    setError({ ...error, date: false });
  };
  const changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 2) {
      setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, date: value } });
    }
    setError({ ...error, date: false });
  };
  const changeEndYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 4) {
      setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, year: value } });
    }
    setError({ ...error, date: false });
  };
  const changeEndMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 2) {
      setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, month: value } });
    }
    setError({ ...error, date: false });
  };
  const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 2) {
      setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, date: value } });
    }
    setError({ ...error, date: false });
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
    if (eventInfo.start_date.year.length === 0
      || eventInfo.start_date.month.length === 0
      || eventInfo.start_date.date.length === 0
      || eventInfo.end_date.year.length === 0
      || eventInfo.end_date.month.length === 0
      || eventInfo.end_date.date.length === 0
    ) {
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

    modifyEvent(requestData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.event}>
        <div>
          <p className={styles.event__paragraph}>사진</p>
          <div className={styles.event__divide}>
            <small className={styles.event__count}>이벤트/공지와 관련된 사진을 올려보세요.</small>
            <small className={styles.event__count}>
              {`${eventInfo.thumbnail_image.length} / 3`}
            </small>
          </div>
          {eventInfo.thumbnail_image.length > 0 && (
            <div className={styles.event__images}>
              {
                eventInfo.thumbnail_image.map((src, id) => {
                  if (typeof src === 'string') {
                    return (
                      <div className={styles['event__each-image']} key={src}>
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
          <label htmlFor="fileUpload" className={styles.event__upload}>
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
          />
        </div>
        <div>
          <div className={styles.event__divide}>
            <p className={styles.event__paragraph}>제목</p>
            <small className={styles.event__count}>
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
            onChange={changeTitle}
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
              onChange={changeStartYear}
            />
            /
            <input
              placeholder="01"
              value={eventInfo.start_date.month}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={changeStartMonth}
            />
            /
            <input
              placeholder="01"
              value={eventInfo.start_date.date}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={changeStartDate}
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
              onChange={changeEndYear}
            />
            /
            <input
              placeholder="01"
              value={eventInfo.end_date.month}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={changeEndMonth}
            />
            /
            <input
              placeholder="01"
              value={eventInfo.end_date.date}
              className={cn({
                [styles['error-border']]: error.date,
                [styles['event-day__input']]: true,
              })}
              onChange={changeEndDate}
            />
          </div>
          {error.date && <div className={styles['error-message']}>필수 입력 항목입니다.</div>}
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={() => navigate(-1)}>취소하기</button>
          <button type="button" className={styles.add} onClick={postEvent} disabled={isPending}>등록하기</button>
        </div>
      </div>
    </div>

  );
}
