import { ShopEvent } from 'model/shopInfo/myShopInfo';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import useMyShop from 'query/shop';
import { useGetEventList } from 'query/event';
import { ReactComponent as EditEventIcon } from 'assets/svg/myshop/edit-event-icon.svg';
import { ReactComponent as AddEventIcon } from 'assets/svg/myshop/add-event-icon.svg';
import { ReactComponent as NonCheckCircle } from 'assets/svg/myshop/non-check-circle.svg';
import { ReactComponent as DeleteIcon } from 'assets/svg/myshop/delete-icon.svg';
import { ReactComponent as Check } from 'assets/svg/myshop/check.svg';
import { ReactComponent as CompleteIcon } from 'assets/svg/myshop/complete-icon.svg';
import EventCard from './components/EventCard';
import DeleteAlertModal from './components/DeleteAlertModal';
import EventErrorModal from './components/EventErrorModal';
import styles from './EventTable.module.scss';

export default function EventTable() {
  const { shopData } = useMyShop();
  const { eventList } = useGetEventList(shopData!.id);
  const [editMenu, setEditMenu] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([]);
  const [isModifyErrorModalOpen, setIsModifyErrorModalOpen] = useState(false);
  const [isDeleteErrorModalOpen, setIsDeleteErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const toggleSelectEvent = (id: number): void => {
    setSelectedEventIds((prev: number[]) => (
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    ));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (selectAll && eventList) {
      setSelectedEventIds(eventList.events.map((event: ShopEvent) => event.event_id));
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
                    setIsModifyErrorModalOpen(true);
                  } else if (selectedEventIds.length > 1) {
                    setModalMessage('이벤트/공지 수정은 중복 선택이 불가합니다.');
<<<<<<< HEAD
                    setIsModifyErrorModalOpen(true);
                  } else showToast('success', '이벤트 수정에 성공했습니다.');
=======
                    setIsModalOpen(true);
                  } else {
                    const selected = eventList?.events.filter(
                      (event) => event.event_id === selectedEventIds[0],
                    )[0];
                    navigate(`/owner/event-modify/${selectedEventIds[0]}`, {
                      state: {
                        content: selected?.content,
                        event_id: selected?.event_id,
                        shop_id: selected?.shop_id,
                        title: selected?.title,
                        thumbnail_images: selected?.thumbnail_images,
                        start_date: selected?.start_date,
                        end_date: selected?.end_date,
                      },
                    });
                  }
>>>>>>> origin/develop
                }}
              >
                수정
                <EditEventIcon />
              </button>
              <button
                type="button"
                className={styles['delete-button']}
                onClick={() => {
<<<<<<< HEAD
                  setIsDeleteErrorModalOpen(true);
=======
                  deleteEvent();
>>>>>>> origin/develop
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
        {isModifyErrorModalOpen && createPortal(
          <EventErrorModal
            content={modalMessage}
            setIsOpen={setIsModifyErrorModalOpen}
            setSelectAll={setSelectAll}
          />,
          document.body,
        )}
        {isDeleteErrorModalOpen && createPortal(
          <DeleteAlertModal
            title={(
              <div>
                작성을
                {' '}
                <span>취소</span>
                {' '}
                하시겠습니까?
              </div>
            )}
            content="삭제한 이벤트는 복구할 수 없습니다."
            setIsOpen={setIsDeleteErrorModalOpen}
          />,
          document.body,
        )}
      </div>
    </>
  );
}
