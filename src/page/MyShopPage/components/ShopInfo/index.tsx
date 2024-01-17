import { MyShopInfoRes } from 'model/shopInfo/myShopInfo';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import { DAY_OF_WEEK, WEEK } from 'utils/constant/week';
import styles from './ShopInfo.module.scss';

export default function ShopInfo({ shopInfo }: { shopInfo: MyShopInfoRes }) {
  const { isMobile } = useMediaQuery();

  const holidayIndex = shopInfo.open.filter((day) => day.closed)
    .map((day) => DAY_OF_WEEK.indexOf(day.day_of_week));
  const holiday = holidayIndex.map((day) => WEEK[day]);

  const openDayIndex = shopInfo.open.filter((day) => !day.closed)
    .map((day) => DAY_OF_WEEK.indexOf(day.day_of_week));

  const content = [
    {
      title: '전화번호',
      data: shopInfo.phone,
    },
    {
      title: '운영시간',
      data: `${shopInfo.open[openDayIndex[0]].open_time} ~ ${shopInfo.open[openDayIndex[0]].close_time}`,
    },
    {
      title: '휴무일',
      data: `매주 ${holiday.join('요일, ')}요일`,
    },
    {
      title: '주소정보',
      data: shopInfo.address,
    }, {
      title: '배달금액',
      data: `${shopInfo.delivery_price}원`,
    },
    {
      title: '기타 정보',
      data: shopInfo.description,
    },

  ];
  return (
    <div>
      {isMobile ? (
        <div className={styles.mobilestore}>
          <div className={styles.mobilestore__imgs}>
            <div className={styles['mobilestore__imgs-main']}>
              <img src={shopInfo.image_urls[0]} alt="main" className={styles['mobilestore__imgs-main-pic']} />
            </div>
          </div>
          <div className={styles.mobilestore__info}>
            <div className={styles.mobilestore__title}>
              <h1 className={styles.mobilestore__name}>{shopInfo.name}</h1>
            </div>
            <div className={styles['mobilestore__keyword-part']}>
              {shopInfo.delivery && (<div className={styles.mobilestore__keywords}>#배달 가능</div>)}
              {shopInfo.pay_card && (<div className={styles.mobilestore__keywords}>#카드 가능</div>)}
              {shopInfo.pay_bank && (<div className={styles.mobilestore__keywords}>#계좌이체 가능</div>)}
            </div>
            <div className={styles.store__content}>
              {content.map((item) => (
                <div className={styles.detail} key={item.title}>
                  <div className={styles.detail__title}>{item.title}</div>
                  <div className={styles.detail__data}>
                    {item.data}
                  </div>
                </div>
              ))}
              <button type="button" className={styles['mobilestore__update-btn']}>가게 정보 수정</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.store}>
          <div className={styles.store__info}>
            <div className={styles.store__title}>
              <h1 className={styles.store__name}>{shopInfo.name}</h1>
              {shopInfo.delivery && (<div className={styles.store__keywords}>#배달 가능</div>)}
              {shopInfo.pay_card && (<div className={styles.store__keywords}>#카드 가능</div>)}
              {shopInfo.pay_bank && (<div className={styles.store__keywords}>#계좌이체 가능</div>)}
            </div>
            <div className={styles.store__content}>
              {content.map((item) => (
                <div className={styles.detail} key={item.title}>
                  <div className={styles.detail__title}>{item.title}</div>
                  <div className={styles.detail__data}>
                    {item.data}
                  </div>
                </div>
              ))}
              <button type="button" className={styles['store__update-btn']}>가게 정보 수정</button>
            </div>
          </div>
          <div className={styles.store__imgs}>
            <div className={styles['store__imgs-main']}>
              <img src={shopInfo.image_urls[0]} alt="main" className={styles['store__imgs-main-pic']} />
            </div>
            <div className={styles.store__subimgs}>
              <div className={styles['store__empty-img']}>
                <CUTLERY className={styles['store__empty-img-icon']} />
                <span className={styles['store__empty-img-caption']}>이미지 준비 중</span>
              </div>
              <div className={styles['store__empty-img']}>
                <CUTLERY className={styles['store__empty-img-icon']} />
                <span className={styles['store__empty-img-caption']}>이미지 준비 중</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
