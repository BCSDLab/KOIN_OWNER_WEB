import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Cutlery } from 'assets/svg/shopRegistration/cutlery.svg';
import Copyright from 'component/common/Copyright';
import Category from 'page/ShopRegistration/component/Modal/Category';
import SearchShop from 'page/ShopRegistration/component/Modal/SearchShop';
import OperateTimePC from 'page/ShopRegistration/component/Modal/OperateTimePC';
import ConfirmPopup from 'page/ShopRegistration/component/ConfirmPopup';
import CustomModal from 'component/common/CustomModal';
import cn from 'utils/ts/className';
import useModalStore from 'store/modalStore';
import { WEEK } from 'utils/constant/week';
import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import useImagesUpload from 'utils/hooks/useImagesUpload';
import CheckSameTime from 'page/ShopRegistration/hooks/CheckSameTime';
import useOperateTimeState from 'page/ShopRegistration/hooks/useOperateTimeState';
import ErrorMessage from 'component/common/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import { usePostData } from 'page/ShopRegistration/view/Mobile/ShopConfirmation/index';
import { ReactComponent as FileImage } from 'assets/svg/auth/default-file.svg';
import useMyShop from 'query/shop';
import { useEffect, useState } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import useStoreTimeSetUp from 'page/ShopRegistration/hooks/useStoreTimeSetUp';
import CustomButton from 'page/Auth/Signup/CustomButton';
import styles from './ShopConfirmation.module.scss';

export default function ShopConfirmation({ onNext }:{ onNext: () => void }) {
  const {
    value: showCategory,
    setTrue: openCategory,
    setFalse: closeCategory,
  } = useBooleanState(false);
  const {
    value: showOperateTime,
    setTrue: openOperateTime,
    setFalse: closeOperateTime,
  } = useBooleanState(false);
  const {
    value: showSearchShop,
    setTrue: openSearchShop,
    setFalse: closeSearchShop,
  } = useBooleanState(false);
  const {
    value: showConfirmPopup,
    setTrue: openConfirmPopup,
    setFalse: closeConfirmPopup,
  } = useBooleanState(false);

  const { shopClosedState } = useModalStore();

  const {
    isAllSameTime,
    hasClosedDay,
    isSpecificDayClosedAndAllSameTime,
    isAllClosed,
  } = CheckSameTime();

  const { categoryList } = useMyShop();

  const {
    register, control, setValue, handleSubmit, formState: { errors },
  } = useFormContext<OwnerShop>();

  const {
    imageFile, imgRef, saveImgFile, uploadError, setImageFile,
  } = useImagesUpload();

  const [isError, setIsError] = useState(false);

  const operateTimeState = useOperateTimeState();

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
  const selectedId = categoryList?.shop_categories[categoryId[0] - 1]?.name;

  useStoreTimeSetUp({ setValue });

  const formatPhoneNumber = (inputNumber: string) => {
    const phoneNumber = inputNumber.replace(/\D/g, '');
    const formattedPhoneNumber = phoneNumber.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
    return formattedPhoneNumber;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setValue('phone', formattedValue);
  };

  const handleNextClick = () => {
    if (imageUrls.length === 0 || name === '' || categoryId.length === 0
      || address === '' || phone === '') {
      setIsError(true);
    } else {
      setIsError(false);
      openConfirmPopup();
    }
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLDivElement>, imageUrl: string) => {
    e.preventDefault();
    setImageFile(imageFile.filter((img) => img !== imageUrl));
  };

  useEffect(() => {
    if (imageFile.length > 0) {
      setValue('image_urls', imageFile);
    }
  }, [imageFile, setValue]);

  const mutation = usePostData({ onNext });

  const onSubmit: SubmitHandler<OwnerShop> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Logo className={styles['container__koin-logo']} />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span className={styles.form__title}>대표 이미지</span>
            <label
              className={cn({
                [styles['form__image-upload']]: true,
                [styles['form__image-upload--active']]: imageUrls.length !== 0,
              })}
              htmlFor="mainMenuImage"
            >
              <input
                type="file"
                accept="image/*"
                id="mainMenuImage"
                className={styles['form__upload-file']}
                {...register('image_urls', { required: true })}
                onChange={saveImgFile}
                ref={imgRef}
              />
              {imageUrls.length !== 0
                ? (
                  imageUrls.map((imageUrl: string) => (
                    <div
                      key={imageUrl}
                      className={styles['form__main-item']}
                      onClick={(e) => handleDeleteImage(e, imageUrl)}
                      aria-hidden
                    >
                      <FileImage />
                      <div className={styles['form__main-text']}>{imageUrl}</div>
                    </div>
                  ))
                ) : (
                  <>
                    <Cutlery className={styles['form__cutlery-cross']} />
                    <span className={styles.form__text}>클릭하여 이미지를 등록해주세요.</span>
                  </>
                )}
            </label>
            {uploadError === '' && isError && imageUrls.length === 0
                  && <ErrorMessage message={ERRORMESSAGE.image} />}
            {uploadError !== '' && <ErrorMessage message={ERRORMESSAGE[uploadError]} />}
          </div>
          <div>
            <span className={styles.form__title}>카테고리</span>
            <div className={styles.form__section}>
              <input
                type="text"
                className={styles.form__input}
                value={selectedId}
                readOnly
              />
              <input
                type="hidden"
                className={styles.form__input}
                {...register('category_ids', { required: true })}
              />

              <CustomButton content="카테고리 검색" buttonSize="small" onClick={openCategory} />
            </div>
            {isError && categoryId.length === 0 && <ErrorMessage message={ERRORMESSAGE.category} />}
          </div>
          <CustomModal
            buttonText="다음"
            title="카테고리 검색"
            modalSize="small"
            hasFooter
            isOverflowVisible={false}
            isOpen={showCategory}
            onCancel={closeCategory}
          >
            <Category />
          </CustomModal>
          <div>
            <span className={styles.form__title}>가게명</span>
            <div className={styles.form__section}>
              <input
                type="text"
                className={styles.form__input}
                value={name}
                {...register('name', { required: true })}
              />
              <CustomButton content="가게검색" buttonSize="small" onClick={openSearchShop} />
            </div>
            {isError && name === '' && <ErrorMessage message={ERRORMESSAGE.name} />}
          </div>
          <CustomModal
            title="가게검색"
            modalSize="large"
            hasFooter={false}
            isOverflowVisible={false}
            isOpen={showSearchShop}
            onCancel={closeSearchShop}
          >
            <SearchShop open={showSearchShop} onCancel={closeSearchShop} />
          </CustomModal>
          <div>
            <span className={styles.form__title}>주소정보</span>
            <div className={styles.form__section}>
              <input
                type="text"
                className={styles['form__input-large']}
                value={address}
                {...register('address', { required: true })}
              />
            </div>
            {isError && address === '' && <ErrorMessage message={ERRORMESSAGE.address} />}
          </div>
          <div>
            <span className={styles.form__title}>전화번호</span>
            <div className={styles.form__section}>
              <input
                type="text"
                inputMode="numeric"
                className={styles['form__input-large']}
                value={phone}
                {...register('phone', {
                  required: true,
                  onChange: handlePhoneChange,
                })}
              />
            </div>
            {isError && phone === '' && <ErrorMessage message={ERRORMESSAGE.phone} />}
          </div>
          <div>
            <span className={styles.form__title}>배달금액</span>
            <div className={styles.form__section}>
              <input
                type="number"
                inputMode="numeric"
                className={styles['form__input-large']}
                value={deliveryPrice === 0 ? undefined : deliveryPrice}
                {...register('delivery_price')}
                onWheel={(e) => (e.target as HTMLElement).blur()}
              />
            </div>
          </div>
          <div>
            <span className={styles.form__title}>운영시간</span>
            <div className={styles.form__section}>
              <div className={styles['form__operate-time']}>
                <div>
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
              </div>
              <CustomButton content="시간수정" buttonSize="small" onClick={openOperateTime} />
            </div>
          </div>
          <CustomModal
            buttonText="다음"
            title="운영시간"
            modalSize="medium"
            hasFooter
            isOpen={showOperateTime}
            isOverflowVisible
            onCancel={closeOperateTime}
          >
            <OperateTimePC />
          </CustomModal>
          <div>
            <span className={styles.form__title}>기타사항</span>
            <div className={styles.form__section}>
              <input
                type="text"
                className={styles['form__input-large']}
                value={description}
                {...register('description')}
              />
            </div>
          </div>
          <div className={styles.form__checkbox}>
            <label htmlFor="delivery" className={styles['form__checkbox-label']}>
              <input
                type="checkbox"
                id="delivery"
                className={styles['form__checkbox-input']}
                {...register('delivery')}
                checked={delivery}
              />
              <span>배달 가능</span>
            </label>
            <label htmlFor="card" className={styles['form__checkbox-label']}>
              <input
                type="checkbox"
                id="card"
                className={styles['form__checkbox-input']}
                {...register('pay_card')}
                checked={payCard}
              />
              <span>카드 가능</span>
            </label>
            <label htmlFor="bank" className={styles['form__checkbox-label']}>
              <input
                type="checkbox"
                id="bank"
                className={styles['form__checkbox-input']}
                {...register('pay_bank')}
                checked={payBank}
              />
              <span>계좌이체 가능</span>
            </label>
          </div>
          <div className={styles['form__next-button']}>
            <CustomButton
              content="다음"
              buttonSize="large"
              onClick={handleNextClick}
            />
          </div>
          <ConfirmPopup
            isOpen={showConfirmPopup}
            onCancel={closeConfirmPopup}
            errors={errors}
          />
        </form>
      </div>
      <Copyright />
    </div>
  );
}
