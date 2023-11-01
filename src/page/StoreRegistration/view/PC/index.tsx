/* eslint-disable react-hooks/exhaustive-deps */
import { ReactComponent as Memo } from 'assets/svg/StoreRegistration/memo.svg';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Cutlery } from 'assets/svg/StoreRegistration/cutlery.svg';
import { useEffect } from 'react';
import useStepStore from 'store/useStepStore';
import Copyright from 'component/common/Copyright';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import Complete from 'component/common/Auth/Complete';
import InputBox from 'page/StoreRegistration/component/InputBox';
import Category from 'page/StoreRegistration/component/Modal/Category';
import SearchStore from 'page/StoreRegistration/component/Modal/SearchStore';
import OperateTimePC from 'page/StoreRegistration/component/Modal/OperateTimePC';
import ConfirmPopup from 'page/StoreRegistration/component/ConfirmPopup';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useBooleanState from 'utils/hooks/useBooleanState';
import CustomModal from 'component/common/CustomModal';
import styles from './StoreRegistrationPC.module.scss';

export default function StoreRegistrationPC() {
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
            <div className={styles.form}>
              <div>
                <span className={styles.form__label}>대표 이미지</span>
                <div className={styles['form__image-upload']}>
                  <Cutlery className={styles['form__cutlery-cross']} />
                  <span className={styles.form__title}>클릭하여 이미지를 등록해주세요.</span>
                </div>
              </div>
              <div>
                <span className={styles.form__label}>카테고리</span>
                <div className={styles.form__section}>
                  <input type="text" className={styles.form__input} />
                  <CustomButton content="카테고리 검색" buttonSize="small" onClick={openCategory} />
                </div>
              </div>
              <CustomModal
                buttonText="다음"
                title="카테고리 검색"
                height="434px"
                hasFooter
                isOpen={showCategory}
                onCancel={closeCategory}
              >
                <Category />
              </CustomModal>
              <InputBox content="대표자명" id="name" />
              <div>
                <span className={styles.form__label}>가게명</span>
                <div className={styles.form__section}>
                  <input type="text" className={styles.form__input} />
                  <CustomButton content="가게검색" buttonSize="small" onClick={openSearchStore} />
                </div>
              </div>
              <CustomModal
                title="가게검색"
                height="75vh"
                hasFooter={false}
                isOpen={showSearchStore}
                onCancel={closeSearchStore}
              >
                <SearchStore open={showSearchStore} onCancel={openSearchStore} />
              </CustomModal>
              <InputBox content="주소정보" id="address" />
              <InputBox content="전화번호" id="phoneNumber" />
              <InputBox content="배달금액" id="deliveryFee" />
              <div>
                <span className={styles.form__label}>운영시간</span>
                <div className={styles.form__section}>
                  <div className={styles['form__operate-time']}>
                    <span>00:00 ~ 24:00</span>
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
                onCancel={closeOperateTime}
              >
                <OperateTimePC />
              </CustomModal>
              <InputBox content="기타정보" id="etc" />
              <div className={styles.form__checkbox}>
                <label htmlFor="delivery" className={styles['form__checkbox-label']}>
                  <input type="checkbox" id="delivery" className={styles['form__checkbox-input']} />
                  <span>배달 가능</span>
                </label>
                <label htmlFor="card" className={styles['form__checkbox-label']}>
                  <input type="checkbox" id="card" className={styles['form__checkbox-input']} />
                  <span>카드 가능</span>
                </label>
                <label htmlFor="bank" className={styles['form__checkbox-label']}>
                  <input type="checkbox" id="bank" className={styles['form__checkbox-input']} />
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
              <ConfirmPopup isOpen={showConfirmPopup} onCancel={closeConfirmPopup} />
            </div>
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
