import { MyStoreInfoRes } from 'model/storeInfo/myStoreInfo';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './StoreInfo.module.scss';

export default function StoreInfo({ storeInfo }: { storeInfo: MyStoreInfoRes }) {
  const { isMobile } = useMediaQuery();

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobilestore}>
          <div className={styles.mobilestore__imgs}>
            <div className={styles['mobilestore__imgs-main']}>
              <img src={storeInfo.image_urls[0]} alt="main" className={styles['mobilestore__imgs-main-pic']} />
            </div>
          </div>
          <div className={styles.mobilestore__info}>
            <div className={styles.mobilestore__title}>
              <h1 className={styles.mobilestore__name}>{storeInfo.name}</h1>
            </div>
            <div className={styles['mobilestore__keyword-part']}>
              {storeInfo.delivery && (<div className={styles['store__small-keywords']}>#배달 가능</div>)}
              {storeInfo.pay_card && (<div className={styles['store__small-keywords']}>#카드 가능</div>)}
              {storeInfo.pay_bank && (<div className={styles['store__large-keywords']}>#계좌이체 가능</div>)}
            </div>
            <div className={styles.store__content}>
              <div className={styles.detail}>
                <div className={styles.detail__title}>전화번호</div>
                <div className={styles.detail__data}>
                  {storeInfo.phone}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>운영시간</div>
                <div className={styles.detail__data}>
                  {(storeInfo.open[0].open_time && storeInfo.open[0].close_time) ? (
                    `${storeInfo.open[0].open_time}~${storeInfo.open[0].close_time}`
                  ) : `${'미등록'}`}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>휴무일</div>
                <div className={styles.detail__data}>
                  {storeInfo.open[0].day_of_week}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>주소정보</div>
                <div className={styles.detail__data}>
                  {storeInfo.address}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>배달금액</div>
                <div className={styles.detail__data}>
                  {`${storeInfo.delivery_price}원`}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>기타 정보</div>
                <div className={styles.detail__data}>
                  {storeInfo.description}
                </div>
              </div>
              <button type="button" className={styles['mobilestore__update-btn']}>가게 정보 수정</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.store}>
          <div className={styles.store__info}>
            <div className={styles.store__title}>
              <h1 className={styles.store__name}>{storeInfo.name}</h1>
              {storeInfo.delivery && (<div className={styles['store__small-keywords']}>#배달 가능</div>)}
              {storeInfo.pay_card && (<div className={styles['store__small-keywords']}>#카드 가능</div>)}
              {storeInfo.pay_bank && (<div className={styles['store__large-keywords']}>#계좌이체 가능</div>)}
            </div>
            <div className={styles.store__content}>
              <div className={styles.detail}>
                <div className={styles.detail__title}>전화번호</div>
                <div className={styles.detail__data}>
                  {storeInfo.phone}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>운영시간</div>
                <div className={styles.detail__data}>
                  {(storeInfo.open[0].open_time && storeInfo.open[0].close_time) ? (
                    `${storeInfo.open[0].open_time}~${storeInfo.open[0].close_time}`
                  ) : `${'미등록'}`}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>휴무일</div>
                <div className={styles.detail__data}>
                  {storeInfo.open[0].day_of_week}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>주소정보</div>
                <div className={styles.detail__data}>
                  {storeInfo.address}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>배달금액</div>
                <div className={styles.detail__data}>
                  {`${storeInfo.delivery_price}원`}
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail__title}>기타 정보</div>
                <div className={styles.detail__data}>
                  {storeInfo.description}
                </div>
              </div>
              <button type="button" className={styles['store__update-btn']}>가게 정보 수정</button>
            </div>
          </div>
          <div className={styles.store__imgs}>
            <div className={styles['store__imgs-main']}>
              <img src={storeInfo.image_urls[0]} alt="main" className={styles['store__imgs-main-pic']} />
            </div>
            <div className={styles.store__subimgs}>
              <div className={styles['store__subimgs-top']}>
                <img src={storeInfo.image_urls[1]} alt="main" className={styles['store__subimgs-top-pic']} />
              </div>
              <div className={styles['store__subimgs-bottom']}>
                <img src={storeInfo.image_urls[2]} alt="main" className={styles['store__subimgs-bottom-pic']} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
