import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAddEvent } from 'query/event';
import { useParams } from 'react-router-dom';
import { FileResponse, getCoopUrl } from 'api/uploadFile';
import axios from 'axios';
import showToast from 'utils/ts/showToast';
import { ReactComponent as Delete } from 'assets/svg/mystore/delete.svg';
import styles from './AddingEvent.module.scss';

/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/label-has-associated-control */

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

interface FileInfo {
  file: File;
  presignedUrl: string;
}

const uploadImage = async ({ presignedUrl, file }: FileInfo) => {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': 'image/jpeg, image/png, image/svg+xml, image/webp',
    },
  });
};

interface ImageList {
  presigned: FileResponse[];
  file: FileList | null;
}

export default function AddingEvent() {
  const [eventInfo, setEventInfo] = useState<EventInfo>(initialState);
  const [editor, setEditor] = useState('');
  const param = useParams();
  const [preImages, setPreImages] = useState<(string | ArrayBuffer | null)[]>([]);
  const [imageList, setImageList] = useState<ImageList>({
    presigned: [],
    file: null,
  });
  const { mutate: addEvent, isPending } = useAddEvent(param.id!);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 25) setEventInfo({ ...eventInfo, title: e.target.value });
  };
  const changeStartYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 4) {
      setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, year: value } });
    }
  };
  const changeStartMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 2) {
      setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, month: value } });
    }
  };
  const changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 2) {
      setEventInfo({ ...eventInfo, start_date: { ...eventInfo.start_date, date: value } });
    }
  };
  const changeEndYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 4) {
      setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, year: value } });
    }
  };
  const changeEndMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 2) {
      setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, month: value } });
    }
  };
  const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/[\D]/gi, '');
    if (value.length <= 2) {
      setEventInfo({ ...eventInfo, end_date: { ...eventInfo.end_date, date: value } });
    }
  };

  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file && file.length > 0) {
      if (file.length + imageList.presigned.length > 3) {
        showToast('error', '이미지는 3개까지 등록할 수 있습니다');
        return;
      }
      for (let i = 0; i < file.length; i += 1) {
        const presignedUrl = await getCoopUrl({
          content_length: file[i].size,
          content_type: file[i].type,
          file_name: file[i].name,
        }).then((res) => res.data);
        setImageList({ file, presigned: [...imageList.presigned, presignedUrl] });
        const reader = new FileReader();
        reader.readAsDataURL(file[i]);
        reader.onload = () => {
          setPreImages((prev) => [...prev, reader.result]); // 이미지 미리보기 구현
        };
      }
    }
  };

  const postEvent = () => {
    const startDate = `${eventInfo.start_date.year}-${eventInfo.start_date.month}-${eventInfo.start_date.date}`;
    const endDate = `${eventInfo.end_date.year}-${eventInfo.end_date.month}-${eventInfo.end_date.date}`;

    if (imageList.file) {
      for (let i = 0; i < imageList.file.length; i += 1) {
        const url = imageList.presigned[i].pre_signed_url;
        uploadImage({ presignedUrl: url, file: imageList.file[i] });
      }
    }

    const requestData = {
      title: eventInfo.title,
      content: editor,
      start_date: startDate,
      end_date: endDate,
      thumbnail_images: imageList.presigned.map((img) => img.file_url),
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
            <small className={styles.event__count}>
              {`${preImages.length} / 3`}
            </small>
          </div>
          {preImages.length > 0 && (
            <div className={styles.event__images}>
              {
                preImages.map((src, id) => {
                  if (typeof src === 'string') {
                    return (
                      <div className={styles['event__each-image']}>
                        <img src={src} alt="미리보기" className={styles.event__image} />
                        <button
                          type="button"
                          className={styles['event__each-image--delete']}
                          onClick={() => {
                            const deleted = preImages.filter((item, idx) => idx !== id);
                            setPreImages([...deleted]);
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
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel}>취소하기</button>
          <button type="button" className={styles.add} onClick={postEvent} disabled={isPending}>등록하기</button>
        </div>
      </div>
    </div>
  );
}
