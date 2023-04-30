import { ReactComponent as EventMarkIcon } from 'assets/svg/mystore/event-menu-mark.svg';
import { ReactComponent as Star } from 'assets/svg/mystore/star.svg';
import useModalOpen from 'utils/hooks/useModalOpen';
import styles from './MystorePage.module.scss';
import Menus from './Menus';
import AddMenuModal from './AddMenuModal';

const STOREINFOS = ['전화번호', '운영 시간', '휴무일', '주소정보', '배달 금액', '가게 정보'];

export default function MystorePage() {
  const { isOpenModal, clickModal, closeModal } = useModalOpen();

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.header}>
          <h1 className={styles.header__title}>가게정보</h1>
          <div className={styles['header__btn-wrapper']}>
            <button type="button" className={styles['header__btn-update']}>메뉴수정</button>
            <button
              type="button"
              className={styles['header__btn-add']}
              onClick={clickModal}
            >
              메뉴추가
            </button>
          </div>
        </div>
        <div className={styles.store}>
          <div className={styles.store__info}>
            <div className={styles.store__top}>
              <h1 className={styles.store__title}>가장 맛있는 족발</h1>
              <div className={styles.store__keywords}>#키워드</div>
            </div>
            <div className={styles.store__content}>
              <div className={styles['store__detail-data']}>
                {STOREINFOS.map((info) => (
                  <div key={info} className={styles['store__detail-data--data']}>{info}</div>
                ))}
              </div>
              <button type="button" className={styles['store__update-btn']}>가게 정보 수정</button>
            </div>
          </div>
          <div className={styles.store__imgs}>
            <div className={styles['store__imgs--main']}>메인이미지</div>
            <div className={styles.store__subimgs}>
              <div className={styles['store__subimgs--top']}>서브이미지1</div>
              <div className={styles['store__subimgs--bottom']}>서브이미지2</div>
            </div>
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles['menu__title-wrapper']}>
            <div className={styles.menu__title}>이벤트 메뉴</div>
            <div>
              <EventMarkIcon className={styles['menu__event-menu-icon--mark']} />
              <Star className={styles['menu__event-menu-icon--star']} />
            </div>
          </div>
          <Menus />
          <div className={styles['menu__title-wrapper']}>
            <div className={styles.menu__title}>대표 메뉴</div>
          </div>
          <Menus />
        </div>
        {isOpenModal && (
        <AddMenuModal
          closeModal={closeModal}
        />
        )}
      </div>
    </div>
  );
}
