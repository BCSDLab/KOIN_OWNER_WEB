import { ShopEvent } from 'model/shopInfo/myShopInfo';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import useMyShop from 'query/shop';
import { useDeleteEvent, useGetEventList } from 'query/event';
import { ReactComponent as EditEventIcon } from 'assets/svg/myshop/edit-event-icon.svg';
import { ReactComponent as AddEventIcon } from 'assets/svg/myshop/add-event-icon.svg';
import { ReactComponent as NonCheckCircle } from 'assets/svg/myshop/non-check-circle.svg';
import { ReactComponent as DeleteIcon } from 'assets/svg/myshop/delete-icon.svg';
import { ReactComponent as Check } from 'assets/svg/myshop/check.svg';
import { ReactComponent as CompleteIcon } from 'assets/svg/myshop/complete-icon.svg';
import showToast from 'utils/ts/showToast';
import EventCard from './components/EventCard';
import EventErrorModal from './components/EventErrorModal';
import styles from './EventTable.module.scss';

export default function EventTable() {
  const { shopData } = useMyShop();
  const { eventList } = useGetEventList(shopData!.id);
  const [editMenu, setEditMenu] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { mutate: deleteEvent } = useDeleteEvent(shopData!.id, selectedEventIds);

  const toggleSelectEvent = (id: number): void => {
    setSelectedEventIds((prev : number[]) => (
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    ));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (selectAll && eventList) {
      setSelectedEventIds(eventList.events.map((event : ShopEvent) => event.event_id));
    } else {
      setSelectedEventIds([]);
    }
  }, [selectAll, eventList]);

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
                onClick={() => {
                  if (selectedEventIds.length < 1) {
                    setModalMessage('이벤트/공지 수정은 최소 하나는 선택해야합니다.');
                    setIsModalOpen(true);
                  } else if (selectedEventIds.length > 1) {
                    setModalMessage('이벤트/공지 수정은 중복 선택이 불가합니다.');
                    setIsModalOpen(true);
                  } else showToast('success', '이벤트 수정에 성공했습니다.');
                }}
              >
                수정
                <EditEventIcon />
              </button>
              <button
                type="button"
                className={styles['delete-button']}
                onClick={() => {
                  deleteEvent();
                  showToast('success', '이벤트 삭제에 성공했습니다.');
                }}
              >
                삭제
                <DeleteIcon />
              </button>
              <button
                type="button"
                className={styles['complete-button']}
                onClick={() => setEditMenu(false)}
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
        {eventList && eventList.events.map((event: ShopEvent) => (
          <EventCard
            key={event.title}
            event={event}
            editState={editMenu}
            selectedEventIds={selectedEventIds}
            toggleSelect={() => toggleSelectEvent(event.event_id)}
          />
        ))}
        {isModalOpen && createPortal(
          <EventErrorModal
            content={modalMessage}
            setIsOpen={setIsModalOpen}
            setSelectAll={setSelectAll}
          />,
          document.body,
        )}
      </div>
    </>
  );
}
