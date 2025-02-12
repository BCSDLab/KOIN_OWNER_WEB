import { MyShopInfoRes } from 'model/shopInfo/myShopInfo';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CUTLERY from 'assets/svg/myshop/cutlery.svg?react';
import EditIcon from 'assets/svg/common/mobile-edit.svg?react';
import CustomModal from 'component/common/CustomModal';
import EditShopInfoModal from 'page/MyShopPage/components/EditShopInfoModal';
import { Dispatch, SetStateAction, useState } from 'react';
import useLogger from 'utils/hooks/useLogger';
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
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1; // 오늘의 운영시간을 보여주도록 변경
  const [openTime, setOpenTime] = useState<string | null>(shopInfo.open[todayIndex].open_time);
  const [closeTime, setCloseTime] = useState<string | null>(
    shopInfo.open[todayIndex].close_time,
  );
  const logger = useLogger();
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
                    <img src={`${src}`} alt={`${shopInfo.name}-${index}번 이미지`} />
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
                    logger.actionEventClick({ actionTitle: 'OWNER', title: 'store_info_edit', value: '가게 정보 수정' });
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
                    {item.data}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles['mobileshop__keyword-part']}>
              {shopInfo.delivery && (<div className={styles.mobileshop__keywords}>#배달 가능</div>)}
              {shopInfo.pay_card && (<div className={styles.mobileshop__keywords}>#카드 가능</div>)}
              {shopInfo.pay_bank && (<div className={styles.mobileshop__keywords}>#계좌이체 가능</div>)}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.shop}>
          <div className={styles.shop__info}>
            <div className={styles.shop__title}>
              <h1 className={styles.shop__name}>{shopInfo.name}</h1>
              {shopInfo.delivery && (<div className={styles.shop__keywords}>#배달 가능</div>)}
              {shopInfo.pay_card && (<div className={styles.shop__keywords}>#카드 가능</div>)}
              {shopInfo.pay_bank && (<div className={styles['shop__keywords--long']}>#계좌이체 가능</div>)}
            </div>
            <div className={styles.shop__content}>
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
                className={styles['shop__update-btn']}
                onClick={() => {
                  openEditShopInfoModal();
                  logger.actionEventClick({ actionTitle: 'OWNER', title: 'store_info_edit', value: '가게 정보 수정' });
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
              <img src={shopInfo.image_urls[0]} alt="main" className={styles['shop__imgs-main-pic']} />
            </div>
            <div className={styles.shop__subimgs}>
              {shopInfo.image_urls[1] ? (
                <div className={styles.shop__subimg}>
                  <img src={shopInfo.image_urls[1]} alt="sub" className={styles['shop__subimgs-pic']} />
                </div>
              ) : (
                <div className={styles['shop__empty-img']}>
                  <CUTLERY className={styles['shop__empty-img-icon']} />
                  <span className={styles['shop__empty-img-caption']}>이미지 준비 중</span>
                </div>
              )}
              {shopInfo.image_urls[2] ? (
                <div className={styles.shop__subimg}>
                  <img src={shopInfo.image_urls[2]} alt="sub" className={styles['shop__subimgs-pic']} />
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
