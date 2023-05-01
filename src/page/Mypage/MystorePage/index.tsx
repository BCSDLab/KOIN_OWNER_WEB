import { ReactComponent as EventMarkIcon } from 'assets/svg/mystore/event-menu-mark.svg';
// import useModalOpen from 'utils/hooks/useModalOpen';
import MY_STORE_INFO from 'static/myStoreInfo';
import styles from './MystorePage.module.scss';
import Menus from './Menus';

// import AddMenuModal from './AddMenuModal';
import StoreInfo from './StoreInfo';

export default function MystorePage() {
  // const { isOpenModal, clickModal, closeModal } = useModalOpen();

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
              // onClick={clickModal}
            >
              메뉴추가
            </button>
          </div>
        </div>
        <StoreInfo storeInfo={MY_STORE_INFO[0]} />
        <div className={styles.menu}>
          <div className={styles['menu__title-wrapper']}>
            <div className={styles.menu__title}>
              이벤트 메뉴
              <EventMarkIcon className={styles['menu__event-menu-icon--mark']} />
            </div>
          </div>
          <Menus />
          <div className={styles['menu__title-wrapper']}>
            <div className={styles.menu__title}>대표 메뉴</div>
          </div>
          <Menus />
        </div>
        {/* {isOpenModal && (
        <AddMenuModal
          closeModal={closeModal}
        />
        )} */}
      </div>
    </div>
  );
}
