import { useEffect, useState } from 'react';
import { ReactComponent as DeleteImgIcon } from 'assets/svg/addmenu/mobile-delete-new-image.svg';
import { MyShopInfoRes } from 'model/shopInfo/myShopInfo';
import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import useImageUpload from 'utils/hooks/useImageUpload';
import { DAY_OF_WEEK, WEEK } from 'utils/constant/week';
import useShopRegistrationStore from 'store/shopRegistration';
import styles from './EditShopInfoModal.module.scss';

export default function EditShopInfoModal({ shopInfo }: { shopInfo: MyShopInfoRes }) {
  const [imageUrlList, setImageUrlList] = useState<string[]>(shopInfo.image_urls);
  const { imageFile, saveImgFile, imgRef } = useImageUpload();
  const {
    setDelivery, setPayBank, setPayCard,
  } = useShopRegistrationStore();

  const holidayIndex = shopInfo.open.filter((day) => day.closed)
    .map((day) => DAY_OF_WEEK.indexOf(day.day_of_week));
  const holiday = holidayIndex.map((day) => WEEK[day]);

  const openDayIndex = shopInfo.open.filter((day) => !day.closed)
    .map((day) => DAY_OF_WEEK.indexOf(day.day_of_week));
  const operatingTime = `${shopInfo.open[openDayIndex[0]].open_time} ~ ${shopInfo.open[openDayIndex[0]].close_time}`;

  const handleDeleteImage = (image: string) => {
    setImageUrlList((prev) => prev.filter((imageUrls) => imageUrls !== image));
  };

  useEffect(() => {
    if (imageFile) {
      setImageUrlList((prev) => [...prev, imageFile]);
    }
  }, [imageFile]);

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <span>메인 사진 변경</span>
        <span className={styles['container__header--warning']}>(최대 이미지 3장)</span>
      </div>
      <div className={styles['container__modify-main-image']}>
        {imageUrlList.map((image, index) => (
          <div className={styles['main-image']} key={image}>
            <img src={image} alt={`Selected ${index + 1}`} className={styles['main-image__image']} />
            <button
              type="button"
              onClick={() => handleDeleteImage(image)}
              className={styles['main-image__delete-button']}
            >
              <DeleteImgIcon />
            </button>
          </div>
        ))}
        {imageUrlList.length < 3 && (
          <label className={styles['main-image__add-button']} htmlFor="mainMenuImage">
            <input
              type="file"
              accept="image/*"
              id="mainMenuImage"
              className={styles['main-image__add-file']}
              onChange={saveImgFile}
              ref={imgRef}
            />
            <ImgPlusIcon className={styles['main-image__add-image-icon']} />
            <span className={styles['main-image__add-caption']}>이미지 추가</span>
          </label>
        )}
      </div>
      <hr className={styles['container__horizontal-line']} />
      <div className={styles.content}>
        <label htmlFor="name" className={styles['main-info']}>
          <span className={styles['main-info__header']}>가게명</span>
          <input
            type="text"
            id="name"
            value={shopInfo.name}
            className={styles['main-info__input']}
          />
        </label>
        <label htmlFor="address" className={styles['main-info']}>
          <span className={styles['main-info__header']}>주소정보</span>
          <input
            type="text"
            id="address"
            value={shopInfo.address}
            className={styles['main-info__input']}
          />
        </label>
        <label htmlFor="phone" className={styles['main-info']}>
          <span className={styles['main-info__header']}>전화번호</span>
          <input
            type="text"
            id="phone"
            value={shopInfo.phone}
            className={styles['main-info__input']}
          />
        </label>
        <label htmlFor="deliveryPrice" className={styles['main-info']}>
          <span className={styles['main-info__header']}>배달금액</span>
          <input
            type="text"
            id="deliveryPrice"
            value={shopInfo.delivery_price}
            className={styles['main-info__input']}
          />
        </label>
        <label htmlFor="deliveryTime" className={styles['main-info']}>
          <span className={styles['main-info__header']}>운영시간</span>
          <input
            type="text"
            id="deliveryTime"
            value={operatingTime}
            className={styles['main-info__input']}
          />
        </label>
        <label htmlFor="description" className={styles['main-info']}>
          <span className={styles['main-info__header']}>기타 정보</span>
          <input
            type="text"
            id="description"
            value={shopInfo.description}
            className={styles['main-info__input']}
          />
        </label>
        <label htmlFor="closedDay" className={styles['main-info']}>
          <span className={styles['main-info__header']}>휴무일</span>
          <input
            type="text"
            id="closedDay"
            value={holiday}
            className={styles['main-info__input']}
          />
        </label>
        <div className={styles['main-info__checkboxes']}>
          <label htmlFor="delivery" className={styles['main-info__checkbox']}>
            <input
              type="checkbox"
              id="delivery"
              className={styles['main-info__checkbox-input']}
              onChange={(e) => setDelivery(e.target.checked)}
              checked={shopInfo.delivery}
            />
            <span>배달 가능</span>
          </label>
          <label htmlFor="payCard" className={styles['main-info__checkbox']}>
            <input
              type="checkbox"
              id="payCard"
              className={styles['main-info__checkbox-input']}
              onChange={(e) => setPayCard(e.target.checked)}
              checked={shopInfo.pay_card}
            />
            <span>카드 가능</span>
          </label>
          <label htmlFor="payBank" className={styles['main-info__checkbox']}>
            <input
              type="checkbox"
              id="payBank"
              className={styles['main-info__checkbox-input']}
              onChange={(e) => setPayBank(e.target.checked)}
              checked={shopInfo.pay_bank}
            />
            <span>계좌이체 가능</span>
          </label>
        </div>
      </div>
      <div className={styles.container__buttons}>
        <button type="button" className={styles['container__buttons--cancel']}>취소</button>
        <button type="button" className={styles['container__buttons--confirm']}>확인</button>
      </div>
    </div>
  );
}
