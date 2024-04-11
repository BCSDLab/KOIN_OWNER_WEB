import { StoreEvent } from 'model/shopInfo/myShopInfo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyShop from 'query/shop';
import { ReactComponent as EditEventIcon } from 'assets/svg/mystore/edit-event-icon.svg';
import { ReactComponent as AddEventIcon } from 'assets/svg/mystore/add-event-icon.svg';
import { ReactComponent as NonCheckCircle } from 'assets/svg/mystore/non-check-circle.svg';
import { ReactComponent as DeleteIcon } from 'assets/svg/mystore/delete-icon.svg';
import { ReactComponent as Check } from 'assets/svg/mystore/check.svg';
import { ReactComponent as CompleteIcon } from 'assets/svg/mystore/complete-icon.svg';
import EventCard from './components';
import styles from './EventTable.module.scss';

export default function EventTable() {
  const { shopData, evnetList } = useMyShop();
  const [editMenu, setEditMenu] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className={styles['manage-event-container']}>
        {editMenu ? (
          <div className={styles['edit-menubar']}>
            <div className={styles['select-all']}>
              <button
                type="button"
                className={styles['select-all-button']}
                onClick={() => setSelectAll(!selectAll)}
              >
                {selectAll ? <Check /> : <NonCheckCircle />}
                전체
              </button>
            </div>
            <div className={styles['edit-menubar--button']}>
              <button
                type="button"
                className={styles['edit-button']}
              >
                수정
                <EditEventIcon />
              </button>
              <button
                type="button"
                className={styles['delete-button']}
              >
                삭제
                <DeleteIcon />
              </button>
              <button
                type="button"
                className={styles['complete-button']}
              >
                완료
                <CompleteIcon />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles['manage-event-button-container']}>
            <button
              type="button"
              className={styles['manage-event-button']}
              onClick={() => setEditMenu(true)}
            >
              편집하기
              <EditEventIcon />
            </button>
            <button
              type="button"
              className={styles['manage-event-button']}
              onClick={() => navigate(`/owner/event-add/${shopData?.id}`)}
            >
              추가하기
              <AddEventIcon />
            </button>
          </div>
        )}
      </div>
      <div className={styles.eventContainer}>
        {evnetList && evnetList.events.map((event: StoreEvent) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>
    </>
  );
}
