/* eslint-disable react-hooks/exhaustive-deps */
import { ReactComponent as Memo } from 'assets/svg/shopRegistration/memo.svg';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Cutlery } from 'assets/svg/shopRegistration/cutlery.svg';
import { useEffect, useRef, useState } from 'react';
import useStepStore from 'store/useStepStore';
import Copyright from 'component/common/Copyright';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import Complete from 'component/common/Auth/Complete';
import Category from 'page/ShopRegistration/component/Modal/Category';
import SearchShop from 'page/ShopRegistration/component/Modal/SearchShop';
import OperateTimePC from 'page/ShopRegistration/component/Modal/OperateTimePC';
import ConfirmPopup from 'page/ShopRegistration/component/ConfirmPopup';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import CustomModal from 'component/common/CustomModal';
import useModalStore from 'store/modalStore';
import { WEEK, DAY_OF_WEEK } from 'utils/constant/week';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { useMutation } from '@tanstack/react-query';
import { postShop } from 'api/shop';
import useImageUpload from 'utils/hooks/useImageUpload';
import CheckSameTime from 'page/ShopRegistration/hooks/CheckSameTime';
import useOperateTimeState from 'page/ShopRegistration/hooks/useOperateTimeState';
import useShopRegistrationStore from 'store/shopRegistration';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import styles from './ShopRegistrationPC.module.scss';

export default function ShopRegistrationPC() {
  const { isMobile } = useMediaQuery();
  const { step, setStep } = useStepStore();
  const {
    value: showCategory,
    setTrue: openCategory,
    setFalse: closeCategory,
    changeValue: toggleCategory,
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
  const {
    imageFile, imgRef, saveImgFile, uploadError,
  } = useImageUpload();
  const [isError, setIsError] = useState(false);
  const deliveryPriceRef = useRef<HTMLInputElement>(null);

  const {
    openTimeState,
    closeTimeState,
    shopClosedState,
  } = useModalStore();

  const {
    setImageUrl,
    setOwner,
    setName,
    setDelivery,
    setPayCard,
    setPayBank,
    setAddress,
    setPhone,
    setDeliveryPrice,
    setDescription,
  } = useShopRegistrationStore();

  const {
    imageUrl,
    categoryId,
    category,
    owner,
    name,
    delivery,
    payCard,
    payBank,
    address,
    phone,
    deliveryPrice,
    description,
  } = useShopRegistrationStore();

  const operateTimeState = useOperateTimeState();

  const {
    isAllSameTime,
    hasClosedDay,
    isSpecificDayClosedAndAllSameTime,
    isAllClosed,
  } = CheckSameTime();

  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm<OwnerShop>({
    resolver: zodResolver(OwnerShop),
  });

  const mutation = useMutation({
    mutationFn: (form: OwnerShop) => postShop(form),
    onSuccess: () => setStep(5),
  });

  const formatPhoneNumber = (inputNumber: string) => {
    const phoneNumber = inputNumber.replace(/\D/g, '');
    const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return formattedPhoneNumber;
  };
  const phoneNumberPattern = /^\d{3}-\d{4}-\d{4}$/;
  const isValidPhoneNumber = phoneNumberPattern.test(phone);
  const handleNextClick = () => {
    if (imageUrl === '' || name === '' || category === '' || Number.isNaN(deliveryPrice)
      || address === '' || phone === '' || !isValidPhoneNumber) {
      setIsError(true);
    } else {
      setIsError(false);
      openConfirmPopup();
    }
  };
  const openTimeArray = Object.values(openTimeState);
  const closeTimeArray = Object.values(closeTimeState);
  const shopClosedArray = Object.values(shopClosedState);

  useEffect(() => {
    if (imageFile !== '' || uploadError !== '') setImageUrl(imageFile);
    const openValue = DAY_OF_WEEK.map((day, index) => ({
      close_time: closeTimeArray[index],
      closed: shopClosedArray[index],
      day_of_week: day,
      open_time: openTimeArray[index],
    }));
    setValue('open', openValue);
    setValue('category_ids', [categoryId]);
    setValue('delivery_price', Number(deliveryPrice));
  }, [openTimeState, closeTimeState, shopClosedState, imageFile]);

  const onSubmit: SubmitHandler<OwnerShop> = (data) => {
    mutation.mutate(data);
  };

  // step 1일 때 그리고 모바일에서 PC로 변경 될 때 카테고리 모달을 자동으로 켜줌
  useEffect(() => {
    if (!isMobile && step === 1) {
      toggleCategory();
    }
  }, [isMobile]);
  return (
    <>
      {step === 0 && (
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <Memo className={styles['block__writing-icon']} />
            <span className={styles.block__title}>가게 정보 기입</span>
            <div className={styles.block__text}>
              <span>
                가게의 다양한 정보를 입력 및 수정하여
                <br />
                학생들에게 최신 가게 정보를 알려주세요
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className={styles['block__next-button']}
            >
              가게 정보 기입
            </button>
          </div>
          <Copyright />
        </div>
      )}
      {step >= 1 && step <= 4 && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Logo className={styles['container__koin-logo']} />
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <span className={styles.form__title}>대표 이미지</span>
                <label className={styles['form__image-upload']} htmlFor="mainMenuImage">
                  <input
                    type="file"
                    accept="image/*"
                    id="mainMenuImage"
                    className={styles['form__upload-file']}
                    {...register('image_urls', { value: [imageUrl] })}
                    onChange={saveImgFile}
                    ref={imgRef}
                  />
                  {imageUrl
                    ? <img src={imageUrl} className={styles['form__main-menu']} alt="메인 메뉴" />
                    : (
                      <>
                        <Cutlery className={styles['form__cutlery-cross']} />
                        <span className={styles.form__text}>클릭하여 이미지를 등록해주세요.</span>
                      </>
                    )}
                </label>
                {uploadError === '' && imageUrl === '' && isError && <ErrorMessage message={ERRORMESSAGE.image} />}
                {uploadError !== '' && <ErrorMessage message={ERRORMESSAGE[uploadError]} />}
              </div>
              <div>
                <span className={styles.form__title}>카테고리</span>
                <div className={styles.form__section}>
                  <input
                    type="text"
                    className={styles.form__input}
                    value={category}
                    readOnly
                  />
                  <CustomButton content="카테고리 검색" buttonSize="small" onClick={openCategory} />
                </div>
                {category === '' && isError && <ErrorMessage message={ERRORMESSAGE.category} />}
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
                <span className={styles.form__title}>대표자명</span>
                <div className={styles.form__section}>
                  <input
                    type="text"
                    className={styles['form__input-large']}
                    value={owner}
                    onChange={(e) => {
                      setOwner(e.target.value);
                    }}
                  />
                </div>
                {owner === '' && isError && <ErrorMessage message={ERRORMESSAGE.owner} />}
              </div>
              <div>
                <span className={styles.form__title}>가게명</span>
                <div className={styles.form__section}>
                  <input
                    type="text"
                    className={styles.form__input}
                    value={name}
                    {...register('name')}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <CustomButton content="가게검색" buttonSize="small" onClick={openSearchShop} />
                </div>
                {name === '' && isError && <ErrorMessage message={ERRORMESSAGE.name} />}
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
                    {...register('address')}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                {address === '' && isError && <ErrorMessage message={ERRORMESSAGE.address} />}
              </div>
              <div>
                <span className={styles.form__title}>전화번호</span>
                <div className={styles.form__section}>
                  <input
                    type="text"
                    className={styles['form__input-large']}
                    value={phone}
                    {...register('phone')}
                    onChange={(e) => {
                      setPhone(formatPhoneNumber(e.target.value));
                    }}
                  />
                </div>
                {phone === '' && isError && <ErrorMessage message={ERRORMESSAGE.phone} />}
                {phone !== '' && !isValidPhoneNumber && isError && <ErrorMessage message={ERRORMESSAGE.invalidPhone} />}
              </div>
              <div>
                <span className={styles.form__title}>배달금액</span>
                <div className={styles.form__section}>
                  <input
                    type="string"
                    className={styles['form__input-large']}
                    defaultValue=""
                    ref={deliveryPriceRef}
                    onChange={(e) => {
                      setDeliveryPrice(Number(e.target.value));
                    }}
                  />
                </div>
                {(Number.isNaN(deliveryPrice) && deliveryPriceRef.current?.value === '')
                  && isError && <ErrorMessage message={ERRORMESSAGE.deliveryPrice} />}
              </div>
              <div>
                <span className={styles.form__title}>운영시간</span>
                <div className={styles.form__section}>
                  <div className={styles['form__operate-time']}>
                    <div>
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
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
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
                    onChange={(e) => setDelivery(e.target.checked)}
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
                    onChange={(e) => setPayCard(e.target.checked)}
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
                    onChange={(e) => setPayBank(e.target.checked)}
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
      )}
      {step === 5 && (
        <div className={styles.wrapper}>
          <Complete title="가게 정보 등록 완료" topText="가게 등록이 완료되었습니다." bottomText="업체 정보 수정은 내 상점에서 가능합니다." link="/login" linkText="메인화면으로 바로가기" />
          <Copyright />
        </div>
      )}
    </>
  );
}
