/* eslint-disable @typescript-eslint/naming-convention */
import { MyShopInfoRes } from 'model/shopInfo/myShopInfo';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CUTLERY from 'assets/svg/myshop/cutlery.svg?react';
import EditIcon from 'assets/svg/common/mobile-edit.svg?react';
import CustomModal from 'component/common/CustomModal';
import EditShopInfoModal from 'page/MyShopPage/components/EditShopInfoModal';
import { Dispatch, SetStateAction, useState } from 'react';
import useLogger from 'utils/hooks/useLogger';
import cn from 'utils/ts/className';
import { DAY_OF_WEEK, WEEK } from 'utils/constant/week';
import styles from './ShopInfo.module.scss';

interface ShopInfoProps {
  shopInfo: MyShopInfoRes;
  openEditShopInfoModal: () => void;
  closeEditShopInfoModal: () => void;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  isEditShopInfoModalOpen: boolean;
  onClickImage: (img: string[], index: number) => void;
}
interface OpenTimeType {
  day_of_week: string;
  closed: boolean;
  open_time: string | null;
  close_time: string | null;
}

type OperatingTimeGroup = {
  dayNames: string;
  label: string;
  status: 'closed' | '24h' | 'time';
};

function getKoreanDay(day_of_week: string): string {
  const idx = DAY_OF_WEEK.indexOf(day_of_week);
  return WEEK[(idx) % 7];
}

function groupOperatingTime(weekData: OpenTimeType[]): OperatingTimeGroup[] {
  if (!weekData || weekData.length === 0) return [];

  const groups: Record<string, OpenTimeType[]> = {};

  weekData.forEach((day) => {
    if (day.closed) {
      const key = 'CLOSED';
      if (!groups[key]) groups[key] = [];
      groups[key].push(day);
    } else {
      const open = day.open_time ?? 'null';
      const close = day.close_time ?? 'null';
      const key = `${open}-${close}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(day);
    }
  });

  const result: OperatingTimeGroup[] = Object.keys(groups).map((key) => {
    const dayList = groups[key];
    const dayNames = dayList.map((d) => getKoreanDay(d.day_of_week)).join(', ');

    if (key === 'CLOSED') {
      return { dayNames, label: '휴무', status: 'closed' };
    }
    const [first] = dayList;
    if (first.open_time === '00:00' && first.close_time === '00:00') {
      return { dayNames, label: '24시간 운영', status: '24h' };
    }
    return { dayNames, label: `${first.open_time} ~ ${first.close_time}`, status: 'time' };
  });

  result.sort((a, b) => {
    const order = (s: OperatingTimeGroup['status']) => {
      if (s === '24h') return 1;
      if (s === 'time') return 2;
      return 3; // 'closed'
    };
    return order(a.status) - order(b.status);
  });

  return result;
}

type ContentItem = {
  title: string;
  data: string | OperatingTimeGroup[];
};

export default function ShopInfo({
  shopInfo,
  openEditShopInfoModal,
  closeEditShopInfoModal,
  setIsSuccess,
  isEditShopInfoModalOpen,
  onClickImage,
}: ShopInfoProps) {
  const { isMobile } = useMediaQuery();
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;
  const [openTime, setOpenTime] = useState<string | null>(shopInfo.open[todayIndex].open_time);
  const [closeTime, setCloseTime] = useState<string | null>(shopInfo.open[todayIndex].close_time);
  const logger = useLogger();

  if (openTime === '24:00') setOpenTime('00:00');
  if (closeTime === '24:00') setCloseTime('00:00');

  const operatingTimeList = groupOperatingTime(shopInfo.open);

  const content: ContentItem[] = [
    { title: '전화번호', data: shopInfo.phone },
    { title: '운영시간', data: operatingTimeList },
    { title: '주소정보', data: shopInfo.address },
    {
      title: '배달금액',
      data: shopInfo.delivery_price === 0 ? '무료' : `${shopInfo.delivery_price}원`,
    },
    { title: '기타 정보', data: shopInfo.description },
  ];

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobileshop}>
          <div className={styles.mobileshop__imgs}>
            {shopInfo.image_urls.length > 0
              && shopInfo.image_urls.map((src, index) => (
                <div key={src} className={styles['mobileshop__imgs-main']}>
                  <button
                    className={styles['mobileshop__imgs-button']}
                    type="button"
                    onClick={() => {
                      if (shopInfo.image_urls.length > 1) {
                        onClickImage(shopInfo.image_urls, index);
                      }
                    }}
                  >
                    <img src={src} alt={`${shopInfo.name}-${index}번 이미지`} />
                  </button>
                </div>
              ))}
          </div>
          <div className={styles.mobileshop__info}>
            <div className={styles.mobileshop__title}>
              <h1 className={styles.mobileshop__name}>{shopInfo.name}</h1>
              <div className={styles.mobileshop__btn}>
                <button
                  type="button"
                  className={styles['mobileshop__edit-btn']}
                  onClick={() => {
                    openEditShopInfoModal();
                    logger.actionEventClick({
                      actionTitle: 'OWNER',
                      title: 'store_info_edit',
                      value: '가게 정보 수정',
                    });
                  }}
                >
                  <EditIcon />
                  수정하기
                </button>
              </div>
            </div>
            <div className={styles.shop__content}>
              {content.map((item) => (
                <div className={styles.detail} key={item.title}>
                  <div className={styles.detail__title}>{item.title}</div>
                  <div className={styles.detail__data}>
                    {Array.isArray(item.data)
                      ? item.data.map((time) => (
                        <div className={styles.lineItem} key={time.dayNames}>
                          <span className={styles.dayNames}>{time.dayNames}</span>
                          {' '}
                          <span className={cn({
                            [styles.time]: true,
                            [styles['time--close']]: time.status === 'closed',
                          })}
                          >
                            {time.label}
                          </span>
                        </div>
                      ))
                      : item.data}
                  </div>
                </div>
              ))}

            </div>
            <div className={styles['mobileshop__keyword-part']}>
              {shopInfo.delivery && <div className={styles.mobileshop__keywords}>#배달 가능</div>}
              {shopInfo.pay_card && <div className={styles.mobileshop__keywords}>#카드 가능</div>}
              {shopInfo.pay_bank && (
                <div className={styles.mobileshop__keywords}>#계좌이체 가능</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.shop}>
          <div className={styles.shop__info}>
            <div className={styles.shop__title}>
              <h1 className={styles.shop__name}>{shopInfo.name}</h1>
              {shopInfo.delivery && <div className={styles.shop__keywords}>#배달 가능</div>}
              {shopInfo.pay_card && <div className={styles.shop__keywords}>#카드 가능</div>}
              {shopInfo.pay_bank && (
                <div className={styles['shop__keywords--long']}>#계좌이체 가능</div>
              )}
            </div>
            <div className={styles.shop__content}>
              {content.map((item) => (
                <div className={styles.detail} key={item.title}>
                  <div className={styles.detail__title}>{item.title}</div>
                  <div className={styles.detail__data}>
                    {Array.isArray(item.data)
                      ? item.data.map((time) => (
                        <div className={styles.lineItem} key={time.dayNames}>
                          <span className={styles.dayNames}>{time.dayNames}</span>
                          {' '}
                          <span className={cn({
                            [styles.time]: true,
                            [styles['time--close']]: time.status === 'closed',
                            [styles['time--all']]: time.status === '24h',
                          })}
                          >
                            {time.label}
                          </span>
                        </div>
                      ))
                      : item.data}
                  </div>
                </div>
              ))}
              <button
                type="button"
                className={styles['shop__update-btn']}
                onClick={() => {
                  openEditShopInfoModal();
                  logger.actionEventClick({
                    actionTitle: 'OWNER',
                    title: 'store_info_edit',
                    value: '가게 정보 수정',
                  });
                }}
              >
                가게 관리하기
              </button>
              {isEditShopInfoModalOpen && (
                <CustomModal
                  title="가게 정보 수정"
                  eventTitle="store_info_edit"
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
          <div className={styles.shop__imgs}>
            <div className={styles['shop__imgs-main']}>
              <img
                src={shopInfo.image_urls[0]}
                alt="main"
                className={styles['shop__imgs-main-pic']}
              />
            </div>
            <div className={styles.shop__subimgs}>
              {shopInfo.image_urls[1] ? (
                <div className={styles.shop__subimg}>
                  <img
                    src={shopInfo.image_urls[1]}
                    alt="sub"
                    className={styles['shop__subimgs-pic']}
                  />
                </div>
              ) : (
                <div className={styles['shop__empty-img']}>
                  <CUTLERY className={styles['shop__empty-img-icon']} />
                  <span className={styles['shop__empty-img-caption']}>이미지 준비 중</span>
                </div>
              )}
              {shopInfo.image_urls[2] ? (
                <div className={styles.shop__subimg}>
                  <img
                    src={shopInfo.image_urls[2]}
                    alt="sub"
                    className={styles['shop__subimgs-pic']}
                  />
                </div>
              ) : (
                <div className={styles['shop__empty-img']}>
                  <CUTLERY className={styles['shop__empty-img-icon']} />
                  <span className={styles['shop__empty-img-caption']}>이미지 준비 중</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
