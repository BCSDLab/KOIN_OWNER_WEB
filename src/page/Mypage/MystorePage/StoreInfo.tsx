// import MY_STORE_INFO from 'static/myStoreInfo';

import { MyStoreInfo } from 'model/storeInfo/myStoreInfo';
import styles from './MystorePage.module.scss';

export default function StoreInfo({ storeInfo }: { storeInfo: MyStoreInfo }) {
  return (
    <div className={styles.store}>
      <div className={styles.store__info}>
        <div className={styles.store__top}>
          <h1 className={styles.store__title}>{storeInfo.name}</h1>
          <div className={styles.store__keywords}>#키워드</div>
        </div>
        <div className={styles.store__content}>
          <div className={styles['store__detail-data']}>
            <div className={styles['store__detail-data-wrapper']}>
              <div className={styles['store__detail-data--data-title']}>전화번호</div>
              <div className={styles['store__detail-data--data']}>
                {storeInfo.phone}
              </div>
            </div>
            <div className={styles['store__detail-data-wrapper']}>
              <div className={styles['store__detail-data--data-title']}>운영시간</div>
              <div className={styles['store__detail-data--data']}>
                {`${storeInfo.open[0].open_time}~${storeInfo.open[0].close_time}`}
              </div>
            </div>
            <div className={styles['store__detail-data-wrapper']}>
              <div className={styles['store__detail-data--data-title']}>휴무일</div>
              <div className={styles['store__detail-data--data']}>
                {storeInfo.open[0].day_of_week}
              </div>
            </div>
            <div className={styles['store__detail-data-wrapper']}>
              <div className={styles['store__detail-data--data-title']}>주소정보</div>
              <div className={styles['store__detail-data--data']}>
                {storeInfo.address}
              </div>
            </div>
            <div className={styles['store__detail-data-wrapper']}>
              <div className={styles['store__detail-data--data-title']}>배달금액</div>
              <div className={styles['store__detail-data--data']}>
                {`${storeInfo.deliveryPrice}원`}
              </div>
            </div>
            <div className={styles['store__detail-data-wrapper']}>
              <div className={styles['store__detail-data--data-title']}>기타 정보</div>
              <div className={styles['store__detail-data--data']}>
                {storeInfo.description}
              </div>
            </div>
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
  );
}
