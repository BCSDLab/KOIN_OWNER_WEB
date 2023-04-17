import { ReactComponent as MarkIcon } from 'assets/svg/mystore/mark.svg';

import styles from './MystorePage.module.scss';

const storeInfos = ['전화번호', '운영 시간', '휴무일', '주소정보', '배달 금액', '가게 정보'];
export default function mystorePage() {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.header__title}>가게정보</div>
        <div className={styles.header__wrapper}>
          <div className={styles.header__updateBtn}>메뉴수정</div>
          <div className={styles.header__addBtn}>메뉴추가</div>
        </div>
      </div>
      <div className={styles.store}>
        <div className={styles.store__info}>
          <div className={styles.store__top}>
            <div className={styles.store__title}>가장 맛있는 족발</div>
            <div className={styles.store__keywords}>#키워드</div>
          </div>
          <div className={styles.store__content}>
            <div className={styles.store__detailData}>
              {storeInfos.map((info) => (
                <div className={styles.store__detailDatas}>{info}</div>
              ))}
            </div>
            <div className={styles.store__updateBtn}>가게 정보 수정</div>
          </div>
        </div>
        <div className={styles.store__imgs}>
          <div className={styles.store__mainimg}>메인이미지</div>
          <div className={styles.store__subimgs}>
            <div className={styles.store__subimg1}>서브이미지1</div>
            <div className={styles.store__subimg2}>서브이미지2</div>
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.menu__titlepart}>
          <div className={styles.menu__title}>이벤트 메뉴</div>
          <MarkIcon className={styles.menu__icon} />
        </div>
        <div className={styles.menu__wrapper}>
          <div className={styles.menu__item}>
            <div className={styles.menu__img}>이미지</div>
          </div>
          <div className={styles.menu__item}>
            <div className={styles.menu__img}>이미지</div>
          </div>
          <div className={styles.menu__item}>
            <div className={styles.menu__img}>이미지</div>
          </div>
          <div className={styles.menu__item}>
            <div className={styles.menu__img}>이미지</div>
          </div>
          <div className={styles.menu__item}>
            <div className={styles.menu__img}>이미지</div>
          </div>
        </div>
        <div className={styles.menu__title}>대표 메뉴</div>
        <div className={styles.menu__item}>
          <div className={styles.menu__img}>이미지</div>
        </div>
      </div>
    </div>
  );
}
