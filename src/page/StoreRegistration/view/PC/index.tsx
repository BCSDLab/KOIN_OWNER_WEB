/* eslint-disable react-hooks/exhaustive-deps */
import { ReactComponent as Memo } from 'assets/svg/shopRegistration/memo.svg';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Cutlery } from 'assets/svg/shopRegistration/cutlery.svg';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import useStepStore from 'store/useStepStore';
import Copyright from 'component/common/Copyright';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import Complete from 'component/common/Auth/Complete';
import InputBox from 'page/StoreRegistration/component/InputBox';
import Category from 'page/StoreRegistration/component/Modal/Category';
import SearchShop from 'page/StoreRegistration/component/Modal/SearchShop';
import OperateTimePC from 'page/StoreRegistration/component/Modal/OperateTimePC';
import ConfirmPopup from 'page/StoreRegistration/component/ConfirmPopup';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import CustomModal from 'component/common/CustomModal';
import useModalStore from 'store/modalStore';
import WEEK from 'utils/constant/week';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { useMutation } from '@tanstack/react-query';
import { postRegisterShop } from 'api/shop';
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
    value: showSearchStore,
    setTrue: openSearchStore,
    setFalse: closeSearchStore,
  } = useBooleanState(false);
  const {
    value: showConfirmPopup,
    setTrue: openConfirmPopup,
    setFalse: closeConfirmPopup,
  } = useBooleanState(false);
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const { result } = reader;
      if (typeof result === 'string') {
        setImgFile(result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const {
    categoryState,
    searchShopState: searchStoreState,
    setSearchShopState: setSearchStoreState,
    openTimeState,
    closeTimeState,
    shopClosedState: storeClosedState,
  } = useModalStore();

  type OperateTimeProps = { [key: string]: string };
  const [operateTimeState, setOperateTimeState] = useState<OperateTimeProps>({});
  const openDay = WEEK.filter((day) => storeClosedState[day] === false)[0];
  useEffect(() => {
    setOperateTimeState((prevOperateTimeState) => ({
      ...prevOperateTimeState,
      휴일: `매주 ${WEEK.filter((day) => storeClosedState[day]).join('요일 ')}요일 정기 휴무`,
      시간: `${openTimeState[openDay]} ~ ${closeTimeState[openDay]}`,
    }));
  }, [openTimeState, closeTimeState, storeClosedState]);

  WEEK.forEach((day) => {
    operateTimeState[day] = storeClosedState[day] ? `매주 ${day} 정기 휴무` : `${openTimeState[day]} ~ ${closeTimeState[day]}`;
  });

  const DAY_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  const openTimeArray = Object.values(openTimeState);
  const closeTimeArray = Object.values(closeTimeState);
  const storeClosedArray = Object.values(storeClosedState);
  const 전부_같은_시간인가 = openTimeArray.every((time) => openTimeArray[0] === time)
    && closeTimeArray.every((time) => closeTimeArray[0] === time);

  const 휴일이_있는_날이_있는가 = storeClosedArray.some((closed) => closed);

  const 휴일이_아닌_오픈_시간이_전부_같은가 = useMemo(() => {
    const 휴일이_아닌_오픈시간 = openTimeArray.find((time, index) => {
      if (!storeClosedArray[index]) return time;
      return false;
    })!;
    return openTimeArray.every((time, index) => {
      if (storeClosedArray[index]) return true;
      return time === 휴일이_아닌_오픈시간;
    });
  }, [openTimeArray, storeClosedArray]);

  const 휴일이_아닌_폐점_시간이_전부_같은가 = useMemo(() => {
    const 휴일이_아닌_폐점시간 = closeTimeArray.find((time, index) => {
      if (!storeClosedArray[index]) return time;
      return false;
    })!;
    return closeTimeArray.every((time, index) => {
      if (storeClosedArray[index]) return true;
      return time === 휴일이_아닌_폐점시간;
    });
  }, [closeTimeArray, storeClosedArray]);

  const 특정_날만_휴일이고_전부_같은_시간인가 = 휴일이_있는_날이_있는가 && 휴일이_아닌_오픈_시간이_전부_같은가 && 휴일이_아닌_폐점_시간이_전부_같은가;

  const {
    register, handleSubmit, setValue,
  } = useForm<OwnerShop>({
    resolver: zodResolver(OwnerShop),
  });

  const mutation = useMutation({
    mutationFn: (form: OwnerShop) => postRegisterShop(form),
    onSuccess: () => setStep(5),
  });

  useEffect(() => {
    const openValue = DAY_OF_WEEK.map((day, index) => ({
      close_time: closeTimeArray[index],
      closed: storeClosedArray[index],
      day_of_week: day,
      open_time: openTimeArray[index],
    }));
    setValue('open', openValue);
    setValue('image_urls', [imgFile]);
    setValue('name', searchStoreState);
    setValue('category_ids', [categoryState[1]]);
  }, [openTimeState, closeTimeState, imgFile]);

  const onSubmit: SubmitHandler<OwnerShop> = (data) => {
    mutation.mutate(data);
  };

  // step 1일 때 그리고 모바일에서 PC로 변경 될 때 카테고리 모달을 자동으로 켜줌
  useEffect(() => {
    if (!isMobile && step === 1) {
      toggleCategory();
    }
  }, []);

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
                    onChange={saveImgFile}
                    ref={imgRef}
                  />
                  {imgFile
                    ? <img src={imgFile} className={styles['form__main-menu']} alt="" />
                    : (
                      <>
                        <Cutlery className={styles['form__cutlery-cross']} />
                        <span className={styles.form__text}>클릭하여 이미지를 등록해주세요.</span>
                      </>
                    )}
                </label>
              </div>
              <div>
                <span className={styles.form__title}>카테고리</span>
                <div className={styles.form__section}>
                  <input
                    type="text"
                    className={styles.form__input}
                    value={categoryState[0]}
                    readOnly
                  />
                  <CustomButton content="카테고리 검색" buttonSize="small" onClick={openCategory} />
                </div>
              </div>
              <CustomModal
                buttonText="다음"
                title="카테고리 검색"
                height="434px"
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
                  />
                </div>
              </div>
              <div>
                <span className={styles.form__title}>가게명</span>
                <div className={styles.form__section}>
                  <input
                    type="text"
                    className={styles.form__input}
                    value={searchStoreState}
                    onChange={(e) => {
                      setSearchStoreState(e.target.value);
                    }}
                  />
                  <CustomButton content="가게검색" buttonSize="small" onClick={openSearchStore} />
                </div>
              </div>
              <CustomModal
                title="가게검색"
                height="75vh"
                hasFooter={false}
                isOverflowVisible={false}
                isOpen={showSearchStore}
                onCancel={closeSearchStore}
              >
                <SearchShop open={showSearchStore} onCancel={closeSearchStore} />
              </CustomModal>
              <InputBox content="주소정보" id="address" register={register} inputType="text" />
              <InputBox content="전화번호" id="phone" register={register} inputType="tel" />
              <InputBox content="배달금액" id="delivery_price" register={register} inputType="number" />
              <div>
                <span className={styles.form__title}>운영시간</span>
                <div className={styles.form__section}>
                  <div className={styles['form__operate-time']}>
                    <div>
                      {
                        전부_같은_시간인가 && !휴일이_있는_날이_있는가 ? (
                          <div>
                            {operateTimeState['시간']}
                          </div>
                        )
                          : null
                      }
                      {
                        특정_날만_휴일이고_전부_같은_시간인가 ? (
                          <div>
                            <div>{operateTimeState['시간']}</div>
                            <div>{operateTimeState['휴일']}</div>
                          </div>
                        ) : null
                      }
                      {
                        !전부_같은_시간인가 && !특정_날만_휴일이고_전부_같은_시간인가 ? (
                          <>
                            {WEEK.map((day) => (
                              <div key={day}>
                                {storeClosedState[day] ? `${operateTimeState[day]}` : `${day} : ${operateTimeState[day]}`}
                              </div>
                            ))}
                          </>
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
                height="536px"
                hasFooter
                isOpen={showOperateTime}
                isOverflowVisible
                onCancel={closeOperateTime}
              >
                <OperateTimePC />
              </CustomModal>
              <InputBox content="기타정보" id="description" register={register} inputType="text" />
              <div className={styles.form__checkbox}>
                <label htmlFor="delivery" className={styles['form__checkbox-label']}>
                  <input type="checkbox" id="delivery" className={styles['form__checkbox-input']} {...register('delivery')} />
                  <span>배달 가능</span>
                </label>
                <label htmlFor="card" className={styles['form__checkbox-label']}>
                  <input type="checkbox" id="card" className={styles['form__checkbox-input']} {...register('pay_card')} />
                  <span>카드 가능</span>
                </label>
                <label htmlFor="bank" className={styles['form__checkbox-label']}>
                  <input type="checkbox" id="bank" className={styles['form__checkbox-input']} {...register('pay_bank')} />
                  <span>계좌이체 가능</span>
                </label>
              </div>
              <div className={styles['form__next-button']}>
                <CustomButton
                  content="다음"
                  buttonSize="large"
                  onClick={openConfirmPopup}
                />
              </div>
              <ConfirmPopup
                isOpen={showConfirmPopup}
                onCancel={closeConfirmPopup}
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
