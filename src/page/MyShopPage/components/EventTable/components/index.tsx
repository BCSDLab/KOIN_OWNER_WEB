import { useState } from 'react';
import { ReactComponent as SeeInfoArrow } from 'assets/svg/mystore/see-info-arrow.svg';
import { ReactComponent as HiddenInfoArrow } from 'assets/svg/mystore/hidden-info-arrow.svg';
import { ReactComponent as NonCheck } from 'assets/svg/mystore/non-check.svg';
import { ReactComponent as Check } from 'assets/svg/mystore/check.svg';
import cn from 'utils/ts/className';
import { StoreEvent } from 'model/shopInfo/myShopInfo';
import styles from './EventCard.module.scss';

interface EventCardprops {
  event : StoreEvent,
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
      {event.thumbnail_images ? (
        <img
          src={event.thumbnail_images[0]}
          alt={event.title}
          className={cn({
            [styles.eventThumbail]: true,
            [styles['eventThumbail--nonHidden']]: hiddenInfo === false,
          })}
        />
      ) : (
        <img
          src="https://static.koreatech.in/assets/img/empty-thumbnail.png"
          alt="KOIN service logo"
          className={cn({
            [styles.eventThumbail]: true,
            [styles['eventThumbail--nonHidden']]: hiddenInfo === false,
          })}
        />
      )}
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
          {event.content}
        </div>
        <div className={styles.eventUpdatedAt}>{event.start_date.replace(/-/g, '.')}</div>
      </div>
    </div>
  );
}