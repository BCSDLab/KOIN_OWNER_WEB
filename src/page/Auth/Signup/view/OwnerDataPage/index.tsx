import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import useBooleanState from 'utils/hooks/useBooleanState';
import SearchStore from 'page/StoreRegistration/component/Modal/SearchStore';
import CustomModal from 'component/common/CustomModal';
import useCheckOwnerData from 'page/Auth/Signup/hooks/useOwnerData';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import styles from './OwnerData.module.scss';

type ButtonClickEvent = {
  clickEvent: () => void;
};
export default function OwnerData({ clickEvent }:ButtonClickEvent) {
  const { isMobile } = useMediaQuery();
  const {
    value: isOpen, setTrue: openSearchStore,
    setFalse: closeSearchStore,
  } = useBooleanState(false);
  const {
    ownerNameRegister,
    shopNameNameRegister,
    registrationNumberFrontRegister,
    registrationNumberMiddleRegister,
    registrationNumberEndRegister,
    fileRegister,
    phoneFrontRegister,
    phoneMiddleRegister,
    phoneEndRegister,
    handleSubmit,
    errors,
    watch,
  } = useCheckOwnerData();
  const onSumbmit = () => {
    console.log(watch('ownerName'), watch('shopName'));
    console.log(watch('registrationNumberFront'), watch('registrationNumberMiddle'), watch('registrationNumberEnd'));
    console.log(watch('phoneFront'), watch('phoneMiddle'), watch('phoneEnd'));
    console.log(watch('registerFiles'));
    console.log(clickEvent);
  };
  return (
    <>
      <section className={styles.form}>
        <div>
          <span className={styles.form__label}>대표자명</span>
          <input className={styles.form__input} type="text" placeholder={isMobile ? '대표자명(실명)' : ''} {...ownerNameRegister} />
        </div>
        {errors.ownerName && <ErrorMessage message={errors.ownerName.message} />}
        <div>
          <span className={styles.form__label}>가게명</span>
          <div className={styles['input__store-name--wrapper']}>
            <input className={styles['input__store-name']} type="text" placeholder={isMobile ? '대표자명(실명)' : ''} {...shopNameNameRegister} />
            <CustomButton content="가게검색" buttonSize={isMobile ? 'mobile-small' : 'small'} onClick={openSearchStore} />
          </div>
        </div>
        {errors.shopName && <ErrorMessage message={errors.shopName.message} />}
        <div>
          <span className={styles.form__label}>사업자등록번호</span>
          {!isMobile ? (
            <div className={styles.input}>
              <div className={styles['form__input__registration-number']}>
                <input className={styles['form__input__registration-number--first']} type="text" maxLength={3} {...registrationNumberFrontRegister} />
              </div>
              <div className={styles['form__input__registration-number']}>
                <input className={styles['form__input__registration-number--middle']} type="text" maxLength={2} {...registrationNumberMiddleRegister} />
              </div>
              <div>
                <input className={styles['form__input__registration-number--last']} type="text" maxLength={5} {...registrationNumberEndRegister} />
              </div>
            </div>
          )
            : <input className={styles.form__input} type="text" placeholder="사업자등록번호" />}
        </div>
        {errors.registrationNumberFront
        && <ErrorMessage message={errors.registrationNumberFront.message} />}
        <div>
          <span className={styles.form__label}>개인 연락처</span>
          {!isMobile ? (
            <div className={styles.input}>
              <div className={styles['form__input__phone-number']}>
                <input className={styles['form__input__phone-number--first']} type="text" maxLength={3} pattern="\d*" {...phoneFrontRegister} />
              </div>
              <div className={styles['form__input__phone-number']}>
                <input className={styles['form__input__phone-number--middle']} type="text" maxLength={4} pattern="^[0-9]+$" {...phoneMiddleRegister} />
              </div>
              <div>
                <input className={styles['form__input__phone-number--last']} type="text" maxLength={4} pattern="^[0-9]+$" {...phoneEndRegister} />
              </div>
            </div>
          )
            : <input className={styles.form__input} type="text" placeholder="개인 연락처" />}
        </div>
        {errors.phoneFront && <ErrorMessage message={errors.phoneFront.message} />}
        <div>
          <span className={styles.form__label}>파일첨부</span>
          <div className={styles['file-box']}>
            <div className={styles['file-box__plus-box-image']} />
            <span className={styles['file-box__command']}>{!isMobile ? '파일을 마우스로 끌어 오세요.' : '파일을 첨부해주세요'}</span>
            <span className={styles['file-box__information']}>
              {!isMobile ? '사업자등록증, 영업신고증, 통장사본 이미지 필수10mb 이하의 PDF 혹은 이미지 형식의 파일(e.g. jpg, png, gif 등)로 5개까지 업로드 가능합니다.' : '사업자등록증, 영업신고증, 통장사본 이미지 첨부'}
            </span>
          </div>
          {!isMobile && (
          <div className={styles.button}>
            <label htmlFor="upload_button" className={styles['button--upload']}>
              <span>내 pc</span>
              <input id="upload_button" type="file" {...fileRegister} />
            </label>
          </div>
          )}
        </div>
        {errors.registerFiles && <ErrorMessage message={errors.registerFiles.message} />}
      </section>
      <div className={styles.buttons}>
        <CustomButton buttonSize="large" content={isMobile ? '확인' : '다음'} onClick={handleSubmit(onSumbmit)} />
      </div>
      {isOpen && (
      <CustomModal
        title="가게검색"
        height="75vh"
        hasFooter={false}
        isOpen={isOpen}
        onCancel={closeSearchStore}
      >
        <SearchStore open={isOpen} onCancel={openSearchStore} />
      </CustomModal>
      )}
    </>
  );
}
