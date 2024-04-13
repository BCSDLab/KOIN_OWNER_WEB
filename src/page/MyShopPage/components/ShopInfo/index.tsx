import { MyShopInfoRes } from 'model/shopInfo/myShopInfo';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import { ReactComponent as GearIcon } from 'assets/svg/mystore/gear.svg';
import { DAY_OF_WEEK, WEEK } from 'utils/constant/week';
import CustomModal from 'component/common/CustomModal';
import EditShopInfoModal from 'page/MyShopPage/components/EditShopInfoModal';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './ShopInfo.module.scss';

interface ShopInfoProps {
  shopInfo: MyShopInfoRes;
  openEditShopInfoModal: () => void;
  closeEditShopInfoModal: () => void;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  isEditShopInfoModalOpen: boolean;
  onClickImage: (img: string[], index: number) => void;
}

export default function ShopInfo({
  shopInfo, openEditShopInfoModal, closeEditShopInfoModal, setIsSuccess,
  isEditShopInfoModalOpen, onClickImage,
}: ShopInfoProps) {
  const { isMobile } = useMediaQuery();
  const openDayIndex = shopInfo.open.filter((day) => !day.closed)
    .map((day) => DAY_OF_WEEK.indexOf(day.day_of_week));
  const [openTime, setOpenTime] = useState<string | null>(shopInfo.open[openDayIndex[0]].open_time);
  const [closeTime, setCloseTime] = useState<string | null>(
    shopInfo.open[openDayIndex[0]].close_time,
  );

  const holidayIndex = shopInfo.open.filter((day) => day.closed)
    .map((day) => DAY_OF_WEEK.indexOf(day.day_of_week));
  const holiday = holidayIndex.map((day) => WEEK[day]);

  if (openTime === '24:00') setOpenTime('00:00');
  if (closeTime === '24:00') setCloseTime('00:00');

  const content = [
    {
      title: '전화번호',
      data: shopInfo.phone,
    },
    {
      title: '운영시간',
      data: `${openTime} ~ ${closeTime}`,
    },
    {
      title: '휴무일',
      data: holiday.length > 0 ? `매주 ${holiday.join('요일, ')}요일` : '없음',
    },
    {
      title: '주소정보',
      data: shopInfo.address,
    }, {
      title: '배달금액',
      data: shopInfo.delivery_price === 0 ? '무료' : `${shopInfo.delivery_price}원`,
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
            {shopInfo.image_urls.length > 0
              && shopInfo.image_urls.map((src, index) => (
                <div key={src} className={styles['mobilestore__imgs-main']}>
                  <button
                    className={styles['mobilestore__imgs-button']}
                    type="button"
                    onClick={() => {
                      if (shopInfo.image_urls.length > 1) {
                        onClickImage(shopInfo.image_urls, index);
                      }
                    }}
                  >
                    <img src={`${src}`} alt={`${shopInfo.name}-${index}번 이미지`} />
                  </button>
                </div>
              ))}
          </div>
          <div className={styles.mobilestore__btn}>
            <button
              type="button"
              className={styles['mobilestore__update-btn']}
              onClick={openEditShopInfoModal}
            >
              가게 관리하기
              <GearIcon />
            </button>
          </div>
          <div className={styles.mobilestore__info}>
            <div className={styles.mobilestore__title}>
              <h1 className={styles.mobilestore__name}>{shopInfo.name}</h1>
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
            </div>
            <div className={styles['mobilestore__keyword-part']}>
              {shopInfo.delivery && (<div className={styles.mobilestore__keywords}>#배달 가능</div>)}
              {shopInfo.pay_card && (<div className={styles.mobilestore__keywords}>#카드 가능</div>)}
              {shopInfo.pay_bank && (<div className={styles.mobilestore__keywords}>#계좌이체 가능</div>)}
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
              {shopInfo.pay_bank && (<div className={styles['store__keywords--long']}>#계좌이체 가능</div>)}
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
              <button
                type="button"
                className={styles['store__update-btn']}
                onClick={openEditShopInfoModal}
              >
                가게 정보 수정
              </button>
              {isEditShopInfoModalOpen && (
                <CustomModal
                  title="가게 정보 수정"
                  modalSize="extra-large"
                  hasFooter={false}
                  isOpen={isEditShopInfoModalOpen}
                  onCancel={closeEditShopInfoModal}
                  isOverflowVisible
                >
                  <EditShopInfoModal
                    shopInfo={shopInfo}
                    closeModal={closeEditShopInfoModal}
                    setIsSuccess={setIsSuccess}
                  />
                </CustomModal>
              )}
            </div>
          </div>
          <div className={styles.store__imgs}>
            <div className={styles['store__imgs-main']}>
              <img src={shopInfo.image_urls[0]} alt="main" className={styles['store__imgs-main-pic']} />
            </div>
            <div className={styles.store__subimgs}>
              {shopInfo.image_urls[1] ? (
                <div className={styles.store__subimg}>
                  <img src={shopInfo.image_urls[1]} alt="sub" className={styles['store__subimgs-pic']} />
                </div>
              ) : (
                <div className={styles['store__empty-img']}>
                  <CUTLERY className={styles['store__empty-img-icon']} />
                  <span className={styles['store__empty-img-caption']}>이미지 준비 중</span>
                </div>
              )}
              {shopInfo.image_urls[2] ? (
                <div className={styles.store__subimg}>
                  <img src={shopInfo.image_urls[2]} alt="sub" className={styles['store__subimgs-pic']} />
                </div>
              ) : (
                <div className={styles['store__empty-img']}>
                  <CUTLERY className={styles['store__empty-img-icon']} />
                  <span className={styles['store__empty-img-caption']}>이미지 준비 중</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
