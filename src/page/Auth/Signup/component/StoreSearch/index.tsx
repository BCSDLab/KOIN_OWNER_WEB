import { ReactComponent as CloseButton } from 'assets/svg/StoreRegistration/close-x.svg';
import { ReactComponent as SearchButton } from 'assets/svg/auth/search-glasses.svg';
import { ReactComponent as MobileCloseButton } from 'assets/svg/common/back-arrow.svg';
import { useState } from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './StoreSearch.module.scss';

const DUMMY = [
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: true,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: true,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
  {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: true,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  }, {
    name: '가장 맛있는 족발가장 맛있는 족발가장 맛있는 족발',
    tel: '042-523-5839',
    card: false,
    deliver: true,
    account: false,
  },
];
export default function StoreSearch() {
  const [selectedStore, setStore] = useState(0);
  const { isMobile } = useMediaQuery();
  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          {isMobile && (
          <>
            <MobileCloseButton className={styles['modal__header--close-button']} />
            <span className={styles.logo}>
              사장님용
              <br />
              회원가입
            </span>
          </>
          )}
          <span className={styles['modal__header--modal-name']}>가게 검색</span>
          {!isMobile && <CloseButton className={styles['modal__header--close-button']} />}
        </div>
        <div className={styles.modal__content}>
          <div className={styles['content__search-bar']}>
            <input type="text" placeholder="상점검색" className={styles['content__search-bar--input']} />
            <SearchButton className={styles['content__search-bar--button']} />
          </div>
          <ul className={styles.content__stores}>
            {DUMMY.map((store, index) => (
              <button type="button" className={selectedStore === index ? styles['stores__store--selected'] : styles.stores__store} onClick={() => setStore(index)}>
                <span className={styles.store__name}>{store.name}</span>
                <div className={styles.store__options}>
                  <span className={store.deliver ? styles['store__options--possible'] : styles['store__options--impossible']}>배달</span>
                  <span className={store.card ? styles['store__options--possible'] : styles['store__options--impossible']}>카드결제</span>
                  <span className={store.account ? styles['store__options--possible'] : styles['store__options--impossible']}>계좌이체</span>
                </div>
              </button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
