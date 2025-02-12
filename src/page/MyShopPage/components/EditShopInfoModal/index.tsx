import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import DeleteImgIcon from 'assets/svg/addmenu/mobile-delete-new-image.svg?react';
import { MyShopInfoRes } from 'model/shopInfo/myShopInfo';
import ImgPlusIcon from 'assets/svg/myshop/imgplus.svg?react';
import { DAY_OF_WEEK, WEEK } from 'utils/constant/week';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
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
import useImagesUpload from 'utils/hooks/useImagesUpload';
import { isKoinError, sendClientError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import cn from 'utils/ts/className';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import ErrorMessage from 'component/common/ErrorMessage';
import BankList from 'page/MyShopPage/components/BankList';
import useLogger from 'utils/hooks/useLogger';
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
  const logger = useLogger();
  const {
    setTrue: openOperateTimeModal,
    setFalse: closeOperateTimeModal,
    value: isOperateTimeModalOpen,
  } = useBooleanState(false);

  const {
    imageFile, imgRef, saveImgFile, setImageFile,
  } = useImagesUpload();

  const { categoryList } = useShopCategory();
  const {
    openTimeState, closeTimeState, shopClosedState, resetOperatingTime,
  } = useModalStore();

  const {
    isAllSameTime,
    hasClosedDay,
    isSpecificDayClosedAndAllSameTime,
    isAllClosed,
  } = CheckSameTime();

  const {
    register, control, handleSubmit, setValue, formState: { errors }, setFocus,
  } = useForm<OwnerShop>({
    resolver: zodResolver(OwnerShop),
    defaultValues: {
      ...shopInfo,
      category_ids: shopInfo.shop_categories.map((category) => category.id),
      open: shopInfo.open.map((day) => ({
        day_of_week: day.day_of_week,
        closed: day.closed,
        open_time: day.open_time,
        close_time: day.close_time,
      })),
      main_category_id: shopInfo.shop_categories.map((category) => category.id)[0] || 0,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const openBankList = () => setIsOpen(true);

  const imageUrls = useWatch({ control, name: 'image_urls' });
  const name = useWatch({ control, name: 'name' });
  const categoryId = useWatch({ control, name: 'category_ids' });
  const phone = useWatch({ control, name: 'phone' });
  const address = useWatch({ control, name: 'address' });
  const deliveryPrice = useWatch({ control, name: 'delivery_price' });
  const description = useWatch({ control, name: 'description' });
  const delivery = useWatch({ control, name: 'delivery' });
  const payCard = useWatch({ control, name: 'pay_card' });
  const payBank = useWatch({ control, name: 'pay_bank' });
  const bank = useWatch({ control, name: 'bank' });
  const account = useWatch({ control, name: 'account_number' });

  const handleCategoryIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('category_ids', [Number(e.target.value), 0]);
    setValue('main_category_id', Number(e.target.value));
  };

  const handleDeleteImage = (image: string) => {
    setImageFile(imageFile.filter((img) => img !== image));
  };

  const formatPhoneNumber = (inputNumber: string) => {
    const phoneNumber = inputNumber.replace(/\D/g, '');
    const formattedPhoneNumber = phoneNumber.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
    return formattedPhoneNumber;
  };

  const formattingPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    setValue('phone', formattedValue);
  };

  useEffect(() => {
    if (imageFile.length > 0) {
      setValue('image_urls', imageFile);
    } else if (imageFile.length !== imageUrls.length) {
      setImageFile(imageUrls);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]); // imageFile만 추적함

  const mutation = useMutation({
    mutationFn: (form: OwnerShop) => putShop(shopInfo.id, form),
    onSuccess: () => {
      closeModal();
      setIsSuccess(true);
      resetOperatingTime();
    },
    onError: (e) => {
      if (isKoinError(e)) {
        showToast('error', e.message);
        return;
      }
      sendClientError(e);
    },
  });

  const operateTimeState = useOperateTimeState();
  const openTimeArray = Object.values(openTimeState);
  const closeTimeArray = Object.values(closeTimeState);
  const shopClosedArray = Object.values(shopClosedState);

  useEffect(() => {
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
  }, [shopInfo.open]);

  useEffect(() => {
    const openValue = DAY_OF_WEEK.map((day, index) => ({
      close_time: closeTimeArray[index],
      closed: shopClosedArray[index],
      day_of_week: day,
      open_time: openTimeArray[index],
    }));
    setValue('open', openValue);
  }, [closeTimeArray, openTimeArray, setValue, shopClosedArray]);

  const holiday = WEEK.filter((day) => shopClosedState[day]).length > 0
    ? `매주 ${WEEK.filter((day) => shopClosedState[day]).join('요일, ')}요일`
    : '휴무일 없음';

  const onSubmit: SubmitHandler<OwnerShop> = (data) => {
    mutation.mutate(data);
    logger.actionEventClick({ actionTitle: 'OWNER', title: 'store_info_edit_confirm', value: '가게 정보 수정 완료' });
  };

  return (
    <div>
      {isMobile ? (
        <form className={styles['mobile-container']} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['container__modify-main-image']}>
            {imageUrls.map((image, index) => (
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
            {imageUrls.length < 3 && (
              <label className={styles['main-image__add-button']} htmlFor="mainMenuImage">
                <input
                  type="file"
                  accept="image/*"
                  id="mainMenuImage"
                  className={styles['main-image__add-file']}
                  {...register('image_urls')}
                  onChange={() => {
                    saveImgFile();
                    logger.actionEventClick({ actionTitle: 'OWNER', title: 'store_info_edit_add_image', value: '가게 정보 이미지 추가' });
                  }}
                  ref={imgRef}
                />
                <ImgPlusIcon className={styles['main-image__add-image-icon']} />
                <span className={styles['main-image__add-caption']}>이미지 추가</span>
              </label>
            )}
          </div>
          <div className={styles['mobile-main-info']}>
            <label htmlFor="shopName" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>가게명</span>
              <input
                type="text"
                id="shopName"
                value={name}
                className={styles['mobile-main-info__input']}
                {...register('name')}
              />
            </label>
            <label htmlFor="category" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>카테고리</span>
              <select
                name="category"
                className={styles['mobile-main-info__select']}
                value={categoryId[0]}
                onChange={handleCategoryIdChange}
              >
                {categoryList?.shop_categories.slice(1).map((category) => (
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
                className={styles['mobile-main-info__input']}
                {...register('phone', { onChange: formattingPhoneNumber })}
              />
            </label>
            <div className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>운영시간</span>
              <div className={styles['mobile-operate-time']}>
                <div className={styles['mobile-operate-time__content']}>
                  {isAllSameTime && !hasClosedDay && (
                    <div>
                      {operateTimeState.time}
                    </div>
                  )}
                  {isSpecificDayClosedAndAllSameTime && (
                    <div>
                      <div>{operateTimeState.time}</div>
                      <div>{operateTimeState.holiday}</div>
                    </div>
                  )}
                  {!isAllSameTime && !isSpecificDayClosedAndAllSameTime && !isAllClosed && (
                    <>
                      {WEEK.map((day) => (
                        <div key={day}>
                          {shopClosedState[day] ? `${operateTimeState[day]}` : `${day} : ${operateTimeState[day]}`}
                        </div>
                      ))}
                    </>
                  )}
                  {isAllClosed && (
                    <span>매일 휴무</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    openOperateTimeModal();
                    logger.actionEventClick({ actionTitle: 'OWNER', title: 'store_info_edit_time', value: '가게 정보 시간 수정' });
                  }}
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
                className={styles['mobile-main-info__input']}
                {...register('address', { required: true })}
              />
            </label>
            <label
              htmlFor="deliveryPrice"
              className={cn({
                [styles['mobile-main-info__label']]: true,
                [styles['mobile-main-info__label--error']]: Number.isNaN(deliveryPrice),
              })}
            >
              <span className={styles['mobile-main-info__header']}>배달금액</span>
              <input
                type="number"
                inputMode="decimal"
                id="deliveryPrice"
                value={deliveryPrice}
                className={styles['mobile-main-info__input']}
                {...register('delivery_price', { valueAsNumber: true })}
                onWheel={(e) => (e.target as HTMLElement).blur()} // 마우스 스크롤로 숫자 변경 방지
              />
            </label>
            <div className={styles['mobile-main-info__error-message']}>
              {Number.isNaN(deliveryPrice) && <ErrorMessage message={ERRORMESSAGE.invalidPrice} />}
            </div>
            <label htmlFor="account" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>계좌번호</span>
              <input
                type="button"
                id="account"
                className={styles['mobile-main-info__input']}
                onFocus={openBankList}
                value={account ? `${bank} ${account}` : '계좌번호를 추가할 수 있습니다'}
              />
            </label>
            {isOpen && (
              <BankList
                register={register}
                bankName={bank}
                account_number={account}
                setValue={setValue}
                close={() => setIsOpen(false)}
                setFocus={setFocus}
              />
            )}
            <label htmlFor="description" className={styles['mobile-main-info__label']}>
              <span className={styles['mobile-main-info__header']}>기타정보</span>
              <input
                type="text"
                id="description"
                value={description}
                className={styles['mobile-main-info__input']}
                {...register('description')}
              />
            </label>

            <div className={styles['mobile-main-info__checkboxes']}>
              <label htmlFor="delivery" className={styles['mobile-main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="delivery"
                  className={styles['mobile-main-info__checkbox-input']}
                  checked={delivery}
                  {...register('delivery')}
                />
                <span>배달 가능</span>
              </label>
              <label htmlFor="payCard" className={styles['mobile-main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="payCard"
                  className={styles['mobile-main-info__checkbox-input']}
                  checked={payCard}
                  {...register('pay_card')}
                />
                <span>카드 가능</span>
              </label>
              <label htmlFor="payBank" className={styles['mobile-main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="payBank"
                  className={styles['mobile-main-info__checkbox-input']}
                  checked={payBank}
                  {...register('pay_bank')}
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
                  onClick={() => handleDeleteImage(image)}
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
                  {...register('image_urls')}
                  onChange={() => {
                    saveImgFile();
                    logger.actionEventClick({ actionTitle: 'OWNER', title: 'store_info_edit_add_image', value: '가게 정보 이미지 추가' });
                  }}
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
                className={styles['main-info__input']}
                {...register('name')}
              />
            </label>
            <label htmlFor="category" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>카테고리</span>
              <select
                name="category"
                className={styles['main-info__select']}
                onChange={handleCategoryIdChange}
              >
                {categoryList?.shop_categories.slice(1).map((category) => (
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
                className={styles['main-info__input']}
                {...register('address')}
              />
            </label>
            <label htmlFor="phone" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>전화번호</span>
              <input
                type="text"
                id="phone"
                value={phone}
                className={styles['main-info__input']}
                {...register('phone', { onChange: formattingPhoneNumber })}
              />
            </label>
            <label htmlFor="deliveryPrice" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>배달금액</span>
              <input
                type="number"
                id="deliveryPrice"
                value={deliveryPrice}
                className={styles['main-info__input']}
                {...register('delivery_price', { valueAsNumber: true })}
                onWheel={(e) => (e.target as HTMLElement).blur()} // 마우스 스크롤로 숫자 변경 방지
              />
              <div className={styles['main-info__error-message']}>
                {errors.delivery_price && <ErrorMessage message={ERRORMESSAGE.invalidPrice} />}
              </div>
            </label>
            <div className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>운영시간</span>
              <div className={styles['main-info__operate-time']}>
                <div className={styles['main-info__operate-time--content']}>
                  {isAllSameTime && !hasClosedDay && (
                    <div>
                      {operateTimeState.time}
                    </div>
                  )}
                  {isSpecificDayClosedAndAllSameTime && (
                    <div>
                      <div>{operateTimeState.time}</div>
                      <div>{operateTimeState.holiday}</div>
                    </div>
                  )}
                  {!isAllSameTime && !isSpecificDayClosedAndAllSameTime && !isAllClosed && (
                    <>
                      {WEEK.map((day) => (
                        <div key={day}>
                          {shopClosedState[day] ? `${operateTimeState[day]}` : `${day} : ${operateTimeState[day]}`}
                        </div>
                      ))}
                    </>
                  )}
                  {isAllClosed && (
                    <span>매일 휴무</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    openOperateTimeModal();
                    logger.actionEventClick({ actionTitle: 'OWNER', title: 'store_info_edit_time', value: '가게 정보 시간 수정' });
                  }}
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
                className={styles['main-info__input']}
                {...register('description')}
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
                  checked={delivery}
                  {...register('delivery')}
                />
                <span>배달 가능</span>
              </label>
              <label htmlFor="payCard" className={styles['main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="payCard"
                  className={styles['main-info__checkbox-input']}
                  checked={payCard}
                  {...register('pay_card')}
                />
                <span>카드 가능</span>
              </label>
              <label htmlFor="payBank" className={styles['main-info__checkbox']}>
                <input
                  type="checkbox"
                  id="payBank"
                  className={styles['main-info__checkbox-input']}
                  checked={payBank}
                  {...register('pay_bank')}
                />
                <span>계좌이체 가능</span>
              </label>
            </div>
            <label htmlFor="account" className={styles['main-info__label']}>
              <span className={styles['main-info__header']}>계좌번호</span>
              <input
                type="button"
                id="account"
                className={styles['main-info__input']}
                onClick={openBankList}
                value={account ? `${bank} ${account}` : '계좌번호를 추가할 수 있습니다'}
              />
            </label>
            {isOpen && (
              <BankList
                register={register}
                bankName={bank}
                account_number={account}
                setValue={setValue}
                close={() => setIsOpen(false)}
                setFocus={setFocus}
              />
            )}
          </div>
          <div className={styles.container__buttons}>
            <button
              type="button"
              onClick={() => {
                closeModal();
                logger.actionEventClick({ actionTitle: 'OWNER', title: 'store_info_edit_cancel', value: '가게 정보 수정 취소' });
              }}
              className={styles['container__buttons--cancel']}
            >
              취소
            </button>
            <button type="submit" className={styles['container__buttons--confirm']}>확인</button>
          </div>
        </form>
      )}
      {isMobile && isOperateTimeModalOpen && (
        <OperateTimeMobile isOpen closeModal={closeOperateTimeModal} />
      )}

    </div>
  );
}
