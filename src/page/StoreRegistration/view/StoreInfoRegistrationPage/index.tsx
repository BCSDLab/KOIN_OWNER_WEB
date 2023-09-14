import { ReactComponent as Memo } from 'assets/svg/mystore/memo.svg';
import { ReactComponent as Logo } from 'assets/svg/auth/koin-logo.svg';
import { ReactComponent as Cutlery } from 'assets/svg/mystore/cutlery.svg';
import { useState } from 'react';
import useStepStore from 'store/useStepStore';
import Copyright from 'component/common/Copyright';
import CustomButton from 'page/StoreRegistration/component/CustomButton';
import Complete from 'page/StoreRegistration/component/Complete';
import InputBox from 'page/StoreRegistration/component/InputBox';
import CategoryModal from 'page/StoreRegistration/modal/Category';
import SearchStoreModal from 'page/StoreRegistration/modal/SearchStore';
import OperateTimeModal from 'page/StoreRegistration/modal/OperateTime';
import ConfirmPopup from 'page/StoreRegistration/modal/ConfirmPopup';
import styles from './StoreInfo.module.scss';

interface ModalProps {
  [key: string]: boolean;
  categoryModal: boolean;
  searchStoreModal: boolean;
  timeSettingModal: boolean;
  confirmPopup: boolean;
}

export default function StoreInfo() {
  const { step, setStep } = useStepStore();
  const [isOpen, setIsOpen] = useState<ModalProps>({
    categoryModal: false,
    searchStoreModal: false,
    timeSettingModal: false,
    confirmPopup: false,
  });

  const toggleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetButton = event.target as HTMLButtonElement;
    setIsOpen((prevIsOpen) => ({
      ...prevIsOpen,
      [targetButton.id]: !prevIsOpen[targetButton.id],
    }));
  };

  return (
    <>
      {step === 0 && (
        <div className={styles.block}>
          <Memo className={styles['block__writing-icon']} />
          <span className={styles.block__title}>가게 정보 기입</span>
          <div className={styles.block__text}>
            <span>
              가게의 다양한 정보를 입력 및 수정하여
            </span>
            <span>
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
          <Copyright />
        </div>
      )}
      {step === 1 && (
        <div className={styles.container}>
          <Logo className={styles['container__koin-logo']} />
          <form className={styles.form}>
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
                <CustomButton content="카테고리 검색" buttonType="small" modalId="categoryModal" onClick={toggleModal} />
              </div>
            </div>
            <CategoryModal isOpen={isOpen.categoryModal} onClose={toggleModal} />
            <InputBox content="대표자명" />
            <div>
              <span className={styles.form__label}>가게명</span>
              <div className={styles.form__section}>
                <input type="text" className={styles.form__input} />
                <CustomButton content="가게검색" buttonType="small" modalId="searchStoreModal" onClick={toggleModal} />
              </div>
            </div>
            <SearchStoreModal isOpen={isOpen.searchStoreModal} onClose={toggleModal} />
            <InputBox content="주소정보" />
            <InputBox content="전화번호" />
            <InputBox content="배달금액" />
            <div>
              <span className={styles.form__label}>운영시간</span>
              <div className={styles.form__section}>
                <div className={styles['form__operate-time']}>
                  <span>00:00 ~ 24:00</span>
                </div>
                <CustomButton content="시간수정" buttonType="small" modalId="timeSettingModal" onClick={toggleModal} />
              </div>
            </div>
            <OperateTimeModal isOpen={isOpen.timeSettingModal} onClose={toggleModal} />
            <InputBox content="기타정보" />
            <div className={styles['form__next-button']}>
              <CustomButton
                content="다음"
                buttonType="large"
                modalId="confirmPopup"
                onClick={toggleModal}
              />
            </div>
            <ConfirmPopup isOpen={isOpen.confirmPopup} onClose={toggleModal} />
          </form>
          <Copyright />
        </div>
      )}
      {step === 2 && (
        <div>
          <Complete title="가게 정보 등록 완료" topText="가게 등록이 완료되었습니다." bottomText="업체 정보 수정은 내 상점에서 가능합니다." link="/login" linkText="메인화면으로 바로가기" />
          <Copyright />
        </div>
      )}
    </>
  );
}
