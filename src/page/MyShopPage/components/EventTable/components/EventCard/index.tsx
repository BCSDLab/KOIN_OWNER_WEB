import { useState } from 'react';
import SeeInfoArrow from 'assets/svg/myshop/see-info-arrow.svg?react';
import HiddenInfoArrow from 'assets/svg/myshop/hidden-info-arrow.svg?react';
import NonCheck from 'assets/svg/myshop/non-check.svg?react';
import Check from 'assets/svg/myshop/check.svg?react';
import cn from 'utils/ts/className';
import { ShopEvent } from 'model/shopInfo/myShopInfo';
import EventContent from './components/EventContent';
import styles from './EventCard.module.scss';

interface EventCardprops {
  event : ShopEvent,
  editState : boolean,
  selectedEventIds : number[],
  toggleSelect : (id: number) => void,
}
export default function EventCard({
  event, editState, selectedEventIds, toggleSelect,
}: EventCardprops) {
  const [hiddenInfo, setHiddenInfo] = useState<boolean>(true);

  const toggleHiddenInfo = (state:boolean) => {
    if (state) {
      setHiddenInfo(false);
    } else setHiddenInfo(true);
  };
  const renderThumbnail = () => {
    if (event.thumbnail_images.length > 0) {
      return (
        <img
          src={event.thumbnail_images[0]}
          alt={event.title}
          className={cn({
            [styles.eventThumbail]: true,
            [styles['eventThumbail--nonHidden']]: hiddenInfo === false,
          })}
        />
      );
    }
    // 전체보기가 아닌 경우 로고를 보여주고 전체보기의 경우 기본 이미지를 보여준다.
    if (hiddenInfo) {
      return (
        <img
          src="https://static.koreatech.in/assets/img/mainlogo2.png"
          alt="KOIN service logo"
          className={styles.eventThumbail}
        />
      );
    }

    return (
      <div className={styles['default-event-thumbnail-img-container']}>
        <img
          className={styles['default-event-thumbnail-img']}
          src="https://static.koreatech.in/assets/img/shop-event-thumbnail-default-img.png"
          alt="이미지를 준비중 입니다."
        />
        <div className={styles['default-event-thumbnail-text']}>사장님이 이미지를 준비 중입니다.</div>
      </div>
    );
  };

  return (
    <div
      className={cn({
        [styles.eventCard]: true,
        [styles['eventCard--nonHidden']]: hiddenInfo === false,
      })}
    >
      {editState
      && (
      <button
        type="button"
        className={styles['select-button']}
        onClick={() => {
          toggleSelect(event.event_id);
        }}
      >
        {selectedEventIds.includes(event.event_id) ? (<Check />) : <NonCheck />}
      </button>
      )}
      {renderThumbnail()}

      <div className={styles['event-info']}>
        <div className={styles['event-info__header']}>
          <div className={styles.title}>{event.title}</div>
          <button
            className={styles['arrow-button']}
            type="button"
            aria-label="더보기 버튼"
            onClick={() => { toggleHiddenInfo(hiddenInfo); }}
          >
            전체보기
            {hiddenInfo ? <SeeInfoArrow /> : <HiddenInfoArrow /> }
          </button>
        </div>
        <div className={cn({
          [styles.eventContent]: true,
          [styles['eventContent--nonHidden']]: hiddenInfo === false,
        })}
        >
          <EventContent html={event.content} />
        </div>
        <div className={styles.eventUpdatedAt}>{`${event.start_date.replace(/-/g, '.')} - ${event.end_date.replace(/-/g, '.')}`}</div>
      </div>
    </div>
  );
}
