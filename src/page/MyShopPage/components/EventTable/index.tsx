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
import DeleteAlertModal from 'component/common/Modal/alertModal';
import useLogger from 'utils/hooks/useLogger';
import ROUTES from 'static/routes';
import EventCard from './components/EventCard';
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
  const { mutate: deleteEvents } = useDeleteEvent(shopData!.id, selectedEventIds);
  const logger = useLogger();

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
                    setIsModifyErrorModalOpen(true);
                  } else {
                    const selected = eventList?.events.filter(
                      (event) => event.event_id === selectedEventIds[0],
                    )[0];
                    navigate(`${ROUTES.OWNER_EVENT_MODIFY.replace(':id', String(selectedEventIds[0]))}`, {
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
                }}
              >
                수정
                <EditEventIcon />
              </button>
              <button
                type="button"
                className={styles['delete-button']}
                onClick={() => {
                  setIsDeleteErrorModalOpen(true);
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
              onClick={() => {
                navigate(`${ROUTES.OWNER_EVENT.replace(':id', String(shopData?.id))}`);
                logger.actionEventClick({ actionTitle: 'OWNER', title: 'add_event', value: '이벤트 추가' });
              }}
            >
              추가하기
              <AddEventIcon />
            </button>
          </div>
        )}
      </div>
      <div className={styles.eventContainer}>
        {eventList
        && eventList.events.length > 0 ? eventList.events.map((event: ShopEvent) => (
          <EventCard
            key={event.title}
            event={event}
            editState={editMenu}
            selectedEventIds={selectedEventIds}
            toggleSelect={() => toggleSelectEvent(event.event_id)}
          />
          )) : (
            <div className={styles['event-default-img-container']}>
              <img className={styles['event-default-img']} src="https://static.koreatech.in/assets/img/shop-event-tab-default-img.png" alt="기술적 오류 발생" />
              <div className={styles['event-default-text']}>사장님이 이벤트를 준비 중입니다.</div>
            </div>
          )}
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
                선택한 이벤트를
                {' '}
                <span>삭제</span>
                할까요?
              </div>
            )}
            content="삭제한 이벤트는 복구할 수 없습니다."
            setIsOpen={setIsDeleteErrorModalOpen}
            cancelText="취소"
            acceptText="삭제"
            callBack={deleteEvents}
          />,
          document.body,
        )}
      </div>
    </>
  );
}
