import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  initialError, EventInfo, uploadImage, Change, validateDate,
} from 'page/ManageEvent/AddingEvent/index';
import AlertModal from 'component/common/Modal/alertModal';
import showToast from 'utils/ts/showToast';
import { getOwnerUrl } from 'api/uploadFile';
import { ReactComponent as Delete } from 'assets/svg/myshop/delete.svg';
import cn from 'utils/ts/className';
import styles from 'page/ManageEvent/index.module.scss';
import { useModifyEvent } from 'query/event';
import { ReactComponent as CheckBox } from 'assets/svg/common/checkbox.svg';
import { ReactComponent as Cancel } from 'assets/svg/common/cancel.svg';
import { ReactComponent as Picture } from 'assets/svg/common/picture.svg';
import { ReactComponent as PictureDisalbe } from 'assets/svg/common/picture-disable.svg';
import { createPortal } from 'react-dom';
import ROUTES from 'static/routes';

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
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const { mutate: modifyEvent, isPending } = useModifyEvent(event.shop_id, event.event_id);
  const navigate = useNavigate();

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
    })
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
          <button type="button" className={styles.cancel} onClick={() => { setIsAlertModalOpen(true); }}>
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
          callBack={() => navigate(ROUTES.Main)}
        />,
        document.body,
      )}
    </div>
  );
}
