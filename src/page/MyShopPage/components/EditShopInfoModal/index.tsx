/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch, SetStateAction, useEffect,
} from 'react';
import { ReactComponent as DeleteImgIcon } from 'assets/svg/addmenu/mobile-delete-new-image.svg';
import { MyShopInfoRes } from 'model/shopInfo/myShopInfo';
import { ReactComponent as ImgPlusIcon } from 'assets/svg/myshop/imgplus.svg';
import { DAY_OF_WEEK, WEEK } from 'utils/constant/week';
import useShopRegistrationStore from 'store/shopRegistration';
import { SubmitHandler, useForm } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { putShop } from 'api/shop';
import useShopCategory from 'query/shop';
import useBooleanState from 'utils/hooks/useBooleanState';
import CustomModal from 'component/common/CustomModal';
import OperateTimePC from 'page/ShopRegistration/component/Modal/OperateTimePC';
import useOperateTimeState from 'page/ShopRegistration/hooks/useOperateTimeState';
import CheckSameTime from 'page/ShopRegistration/hooks/CheckSameTime';
import useModalStore from 'store/modalStore';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import OperateTimeMobile from 'page/ShopRegistration/component/Modal/OperateTimeMobile';
import { TOTAL_CATEGORY } from 'utils/constant/category';
import useImagesUpload from 'utils/hooks/useImagesUpload';
import { isKoinError, sendClientError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import styles from './EditShopInfoModal.module.scss';

interface EditShopInfoModalProps {
  shopInfo: MyShopInfoRes;
  closeModal: () => void;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}

export default function EditShopInfoModal({
  shopInfo,
  closeModal,
  setIsSuccess,
}: EditShopInfoModalProps) {
  const { isMobile } = useMediaQuery();
  const {
    setTrue: openOperateTimeModal,
    setFalse: closeOperateTimeModal,
    value: isOperateTimeModalOpen,
  } = useBooleanState(false);
  const {
    imageFile, imgRef, saveImgFile, uploadError, setImageFile,
  } = useImagesUpload();

  const {
    setName, setAddress, setPhone, setDeliveryPrice, setDescription,
    setImageUrls, setDelivery, setPayBank, setPayCard, setCategoryId,
  } = useShopRegistrationStore();
  const {
    name, address, phone, deliveryPrice, description, imageUrls,
    delivery, payBank, payCard, categoryId, removeImageUrl,
  } = useShopRegistrationStore();

  const { categoryList } = useShopCategory();

  const {
    openTimeState,
    closeTimeState,
    shopClosedState,
  } = useModalStore();

  const openTimeArray = Object.values(openTimeState);
  const closeTimeArray = Object.values(closeTimeState);
  const shopClosedArray = Object.values(shopClosedState);

  const {
    isAllSameTime,
    hasClosedDay,
    isSpecificDayClosedAndAllSameTime,
    isAllClosed,
  } = CheckSameTime();

  const handleCategoryIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(e.target.value));
  };

  const {
    handleSubmit, setValue,
  } = useForm<OwnerShop>({
    resolver: zodResolver(OwnerShop),
  });

  useEffect(() => {
    if (imageFile && !uploadError) { // 초기에 이 값이 true기 때문에 imageUrls가 빈 배열로 초기화되고 있었음
      setImageUrls(imageFile);
    }
  }, [imageFile, setImageUrls]);

  const mutation = useMutation({
    mutationFn: (form: OwnerShop) => putShop(shopInfo.id, form),
    onSuccess: () => {
      closeModal();
      setIsSuccess(true);
    },
    onError: (e) => {
      if (isKoinError(e)) {
        showToast('error', e.message);
        return;
      }
      sendClientError(e);
    },
  });
  useEffect(() => {
    setImageUrls(shopInfo.image_urls);
    setImageFile(shopInfo.image_urls);
    setName(shopInfo.name);
    setAddress(shopInfo.address);
    setPhone(shopInfo.phone);
    setDeliveryPrice(shopInfo.delivery_price);
    setDescription(shopInfo.description);
    setDelivery(shopInfo.delivery);
    setPayBank(shopInfo.pay_bank);
    setPayCard(shopInfo.pay_card);
    setCategoryId(shopInfo.shop_categories[1]
      ? shopInfo.shop_categories[1].id
      : TOTAL_CATEGORY);
    shopInfo.open.forEach((day, index) => {
      useModalStore.setState((prev) => ({
        ...prev,
        openTimeState: {
          ...prev.openTimeState,
          [WEEK[index]]: day.open_time,
        },
        closeTimeState: {
          ...prev.closeTimeState,
          [WEEK[index]]: day.close_time,
        },
        shopClosedState: {
          ...prev.shopClosedState,
          [WEEK[index]]: day.closed,
        },
      }));
    });
  }, []);
  const operateTimeState = useOperateTimeState();
  const holiday = WEEK.filter((day) => shopClosedState[day]).length > 0
    ? `매주 ${WEEK.filter((day) => shopClosedState[day]).join('요일, ')}요일`
    : '휴무일 없음';

  useEffect(() => {
    setValue('image_urls', imageUrls);
    const openValue = DAY_OF_WEEK.map((day, index) => ({
      close_time: closeTimeArray[index],
      closed: shopClosedArray[index],
      day_of_week: day,
      open_time: openTimeArray[index],
    }));
    // shop_categories[0]은 전체보기이므로 따로 처리
    if (shopInfo.shop_categories.length === 1) {
      setValue('category_ids', [shopInfo.shop_categories[0].id]);
    } else {
      const categoryIds = shopInfo.shop_categories.map((category) => category.id);
      setValue('category_ids', categoryIds);
    }
    setValue('open', openValue);
    setValue('delivery_price', Number(deliveryPrice));
    setValue('description', description);
    setValue('delivery', delivery);
    setValue('pay_bank', payBank);
    setValue('pay_card', payCard);
    setValue('name', name);
    setValue('phone', phone);
    setValue('address', address);
  }, [imageUrls, openTimeState, closeTimeState, shopClosedState, deliveryPrice,
    description, delivery, payBank, payCard, name, phone, address, categoryId]);

  const onSubmit: SubmitHandler<OwnerShop> = (data) => {
    mutation.mutate(data);
  };

  if (isMobile && isOperateTimeModalOpen) {
    return (
      <OperateTimeMobile
        isOpen={isOperateTimeModalOpen}
        closeModal={closeOperateTimeModal}
      />
    );
  }

  return (
    <div>
      {isMobile ? (
        <form className={styles['mobile-container']} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['mobile-container__image-content']}>
            {imageUrls.map((image, index) => (
              <div className={styles['mobile-container__image']}>
                <img key={image} src={image} alt={`Selected ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => {
                    removeImageUrl(image);
                    setImageFile(imageFile.filter((img) => img !== image));
                  }}
                  className={styles['mobile-container__delete-button']}
                  aria-label="Delete image"
                >
                  <DeleteImgIcon className={styles['mobile__delete-img-icon']} />
                </button>
              </div>
            ))}
          </div>
          <div className={styles['mobile-container__add-button']}>
            <label htmlFor="mainMenuImage">
              <input
                type="file"
                accept="image/*"
                id="mainMenuImage"
                multiple
                className={styles['mobile-container__add-file']}
                onChange={saveImgFile}
                ref={imgRef}
              />
              <span className={styles['mobile-container__modify-image-caption']}>사진변경</span>
            </label>
          </div>
          <div className={styles['mobile-main-info']}>
            <label htmlFor="shopName" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>가게명</span>
              <input
                type="text"
                id="shopName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles['mobile-main-info__input']}
              />
            </label>
            <label htmlFor="category" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>카테고리</span>
              <select name="category" className={styles['mobile-main-info__select']} onChange={handleCategoryIdChange}>
                {categoryList?.shop_categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="phone" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>전화번호</span>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles['mobile-main-info__input']}
              />
            </label>
            <div className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>운영시간</span>
              <div className={styles['mobile-operate-time']}>
                <div className={styles['mobile-operate-time__content']}>
                  {
                    isAllSameTime && !hasClosedDay ? (
                      <div>
                        {operateTimeState.time}
                      </div>
                    )
                      : null
                  }
                  {
                    isSpecificDayClosedAndAllSameTime ? (
                      <div>
                        <div>{operateTimeState.time}</div>
                        <div>{operateTimeState.holiday}</div>
                      </div>
                    ) : null
                  }
                  {
                    !isAllSameTime && !isSpecificDayClosedAndAllSameTime && !isAllClosed ? (
                      <>
                        {WEEK.map((day) => (
                          <div key={day}>
                            {shopClosedState[day] ? `${operateTimeState[day]}` : `${day} : ${operateTimeState[day]}`}
                          </div>
                        ))}
                      </>
                    ) : null
                  }
                  {
                    isAllClosed ? (
                      <span>매일 휴무</span>
                    ) : null
                  }
                </div>
                <button
                  type="button"
                  onClick={openOperateTimeModal}
                  className={styles['mobile-operate-time__button']}
                >
                  수정
                </button>
              </div>
            </div>
            <label htmlFor="shopAddress" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>주소정보</span>
              <input
                type="text"
                id="shopAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={styles['mobile-main-info__input']}
              />
            </label>
            <label htmlFor="deliveryPrice" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>배달금액</span>
              <input
                type="number"
                inputMode="decimal"
                id="deliveryPrice"
                value={deliveryPrice === 0 ? undefined : deliveryPrice}
                onChange={(e) => setDeliveryPrice(Number(e.target.value))}
                className={styles['mobile-main-info__input']}
              />
            </label>
            <label htmlFor="description" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>기타정보</span>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles['mobile-main-info__input']}
              />
            </label>
            <div className={styles['mobile-main-info__checkboxes']}>
              <label htmlFor="delivery" className={styles['mobile-main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="delivery"
                  className={styles['mobile-main-info__checkbox-input']}
                  onChange={(e) => setDelivery(e.target.checked)}
                  checked={delivery}
                />
                <span>배달 가능</span>
              </label>
              <label htmlFor="payCard" className={styles['mobile-main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="payCard"
                  className={styles['mobile-main-info__checkbox-input']}
                  onChange={(e) => setPayCard(e.target.checked)}
                  checked={payCard}
                />
                <span>카드 가능</span>
              </label>
              <label htmlFor="payBank" className={styles['mobile-main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="payBank"
                  className={styles['mobile-main-info__checkbox-input']}
                  onChange={(e) => setPayBank(e.target.checked)}
                  checked={payBank}
                />
                <span>계좌이체 가능</span>
              </label>
            </div>
            <div className={styles['mobile-container__confirm-button-wrapper']}>
              <button type="submit" className={styles['mobile-container__confirm-button']}>수정완료</button>
            </div>
          </div>
        </form>
      ) : (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.container__header}>
            <span>메인 사진 변경</span>
            <span className={styles['container__header--warning']}>(최대 이미지 3장)</span>
          </div>
          <div className={styles['container__modify-main-image']}>
            {imageUrls.map((image, index) => (
              <div className={styles['main-image']} key={image}>
                <img src={image} alt={`Selected ${index + 1}`} className={styles['main-image__image']} />
                <button
                  type="button"
                  onClick={() => {
                    removeImageUrl(image);
                    setImageFile(imageFile.filter((img) => img !== image));
                  }}
                  className={styles['main-image__delete-button']}
                >
                  <DeleteImgIcon />
                </button>
              </div>
            ))}
            {imageUrls.length < 3 && (
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
          <div className={styles['main-info']}>
            <label htmlFor="shopName" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>가게명</span>
              <input
                type="text"
                id="shopName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles['main-info__input']}
              />
            </label>
            <label htmlFor="category" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>카테고리</span>
              <select
                name="category"
                className={styles['main-info__select']}
                onChange={handleCategoryIdChange}
              >
                {categoryList?.shop_categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="shopAddress" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>주소정보</span>
              <input
                type="text"
                id="shopAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={styles['main-info__input']}
              />
            </label>
            <label htmlFor="phone" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>전화번호</span>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles['main-info__input']}
              />
            </label>
            <label htmlFor="deliveryPrice" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>배달금액</span>
              <input
                type="number"
                id="deliveryPrice"
                value={deliveryPrice === 0 ? undefined : deliveryPrice}
                onChange={(e) => setDeliveryPrice(Number(e.target.value))}
                className={styles['main-info__input']}
              />
            </label>
            <div className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>운영시간</span>
              <div className={styles['main-info__operate-time']}>
                <div className={styles['main-info__operate-time--content']}>
                  {
                    isAllSameTime && !hasClosedDay ? (
                      <div>
                        {operateTimeState.time}
                      </div>
                    )
                      : null
                  }
                  {
                    isSpecificDayClosedAndAllSameTime ? (
                      <div>
                        <div>{operateTimeState.time}</div>
                        <div>{operateTimeState.holiday}</div>
                      </div>
                    ) : null
                  }
                  {
                    !isAllSameTime && !isSpecificDayClosedAndAllSameTime && !isAllClosed ? (
                      <>
                        {WEEK.map((day) => (
                          <div key={day}>
                            {shopClosedState[day] ? `${operateTimeState[day]}` : `${day} : ${operateTimeState[day]}`}
                          </div>
                        ))}
                      </>
                    ) : null
                  }
                  {
                    isAllClosed ? (
                      <span>매일 휴무</span>
                    ) : null
                  }
                </div>
                <button
                  type="button"
                  onClick={openOperateTimeModal}
                  className={styles['main-info__operate-time--button']}
                >
                  시간수정
                </button>
                {isOperateTimeModalOpen && (
                  <CustomModal
                    buttonText="다음"
                    title="운영시간"
                    modalSize="medium"
                    hasFooter
                    isOpen={isOperateTimeModalOpen}
                    isOverflowVisible
                    onCancel={closeOperateTimeModal}
                  >
                    <OperateTimePC />
                  </CustomModal>
                )}
              </div>
            </div>
            <label htmlFor="description" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>기타정보</span>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles['main-info__input']}
              />
            </label>
            <label htmlFor="closedDay" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>휴무일</span>
              <input
                type="text"
                id="closedDay"
                value={holiday}
                className={styles['main-info__input']}
                readOnly
              />
            </label>
            <div className={styles['main-info__checkboxes']}>
              <label htmlFor="delivery" className={styles['main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="delivery"
                  className={styles['main-info__checkbox-input']}
                  onChange={(e) => setDelivery(e.target.checked)}
                  checked={delivery}
                />
                <span>배달 가능</span>
              </label>
              <label htmlFor="payCard" className={styles['main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="payCard"
                  className={styles['main-info__checkbox-input']}
                  onChange={(e) => setPayCard(e.target.checked)}
                  checked={payCard}
                />
                <span>카드 가능</span>
              </label>
              <label htmlFor="payBank" className={styles['main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="payBank"
                  className={styles['main-info__checkbox-input']}
                  onChange={(e) => setPayBank(e.target.checked)}
                  checked={payBank}
                />
                <span>계좌이체 가능</span>
              </label>
            </div>
          </div>
          <div className={styles.container__buttons}>
            <button type="button" onClick={closeModal} className={styles['container__buttons--cancel']}>취소</button>
            <button type="submit" className={styles['container__buttons--confirm']}>확인</button>
          </div>
        </form>
      )}
    </div>
  );
}
