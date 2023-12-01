/* eslint-disable jsx-a11y/label-has-associated-control */
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import useBooleanState from 'utils/hooks/useBooleanState';
import SearchShop from 'page/ShopRegistration/component/Modal/SearchShop';
import { ReactComponent as FileImage } from 'assets/svg/auth/default-file.svg';
import CustomModal from 'component/common/CustomModal';
import useCheckOwnerData from 'page/Auth/Signup/hooks/useOwnerData';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import useFileController from 'page/Auth/Signup/hooks/useFileController';
import styles from './OwnerData.module.scss';

type ButtonClickEvent = {
  clickEvent: () => void;
};
export default function OwnerData({ clickEvent }:ButtonClickEvent) {
  const { isMobile } = useMediaQuery();
  const {
    value: isOpen,
    setTrue: openSearchShop,
    setFalse: closeSearchShop,
  } = useBooleanState(false);
  const { value: isActive, setTrue: setActive, setFalse: setUnActive } = useBooleanState(false);
  const {
    ownerNameRegister,
    shopNameRegister,
    registrationNumberRegister,
    fileRegister,
    phoneNumberRegister,
    handleSubmit,
    errors,
    watch,
    getPhoneNumber,
    getRegisterNumber,
  } = useCheckOwnerData();
  const files = watch('registerFiles');

  const { uploadedFiles, addFile, deleteFile } = useFileController(files);
  const onSumbmit = () => {
    console.log(watch('ownerName'), watch('shopName'));
    console.log(getPhoneNumber());
    console.log(getRegisterNumber());
    console.log(watch('registerFiles'));
    console.log(clickEvent);
  };

  const onClick = (index:number, event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    deleteFile(index);
  };

  const handleDragOver = (event:React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setActive();
  };

  const handleDrop = (event:React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setUnActive();
    const file = event.dataTransfer.files[0];
    addFile(file);
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
            <input className={styles['input__store-name']} type="text" placeholder={isMobile ? '대표자명(실명)' : ''} {...shopNameRegister} />
            <CustomButton content="가게검색" buttonSize={isMobile ? 'mobile-small' : 'small'} onClick={openSearchShop} />
          </div>
        </div>
        {errors.shopName && <ErrorMessage message={errors.shopName.message} />}
        <div>
          <span className={styles.form__label}>사업자등록번호</span>
          {!isMobile ? (
            <div className={styles.input}>
              <div className={styles['form__input__registration-number']}>
                <input className={styles['form__input__registration-number--first']} type="text" maxLength={3} {...registrationNumberRegister.front} />
              </div>
              <div className={styles['form__input__registration-number']}>
                <input className={styles['form__input__registration-number--middle']} type="text" maxLength={2} {...registrationNumberRegister.middle} />
              </div>
              <div>
                <input className={styles['form__input__registration-number--last']} type="text" maxLength={5} {...registrationNumberRegister.end} />
              </div>
            </div>
          )
            : <input className={styles.form__input} type="text" placeholder="사업자등록번호" />}
        </div>
        {(registrationNumberRegister.message)
        && <ErrorMessage message={registrationNumberRegister.message} />}
        <div>
          <span className={styles.form__label}>개인 연락처</span>
          {!isMobile ? (
            <div className={styles.input}>
              <div className={styles['form__input__phone-number']}>
                <input className={styles['form__input__phone-number--first']} type="text" maxLength={3} pattern="\d*" {...phoneNumberRegister.front} />
              </div>
              <div className={styles['form__input__phone-number']}>
                <input className={styles['form__input__phone-number--middle']} type="text" maxLength={4} pattern="^[0-9]+$" {...phoneNumberRegister.middle} />
              </div>
              <div>
                <input className={styles['form__input__phone-number--last']} type="text" maxLength={4} pattern="^[0-9]+$" {...phoneNumberRegister.end} />
              </div>
            </div>
          )
            : <input className={styles.form__input} type="text" placeholder="개인 연락처" />}
        </div>
        {(phoneNumberRegister.message) && <ErrorMessage message={phoneNumberRegister.message} />}
        <div>
          <span className={styles.form__label}>파일첨부</span>
          <label
            htmlFor="upload-button"
            className={`${styles['file-box']} ${styles[isActive ? 'active' : '']}`}
            onDragEnter={setActive}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={setUnActive}
            onDrop={(e) => handleDrop(e)}
          >
            <input id="upload-button" className={styles['file-box__input']} type="file" {...fileRegister} multiple />
            {uploadedFiles.length > 0 ? (
              <div className={styles['file-box__files']}>
                {uploadedFiles.map((file:File, index:number) => (
                  <button type="button" className={styles['file-box__file']} onClick={(e) => onClick(index, e)}>
                    <FileImage />
                    <span className={styles['file-box__file--name']}>{file.name}</span>
                  </button>
                ))}
              </div>
            )
              : (
                <>
                  <div className={styles['file-box__plus-box-image']} />
                  <span className={styles['file-box__command']}>{!isMobile ? '파일을 마우스로 끌어 오세요.' : '파일을 첨부해주세요'}</span>
                  <span className={styles['file-box__information']}>
                    {!isMobile ? '사업자등록증, 영업신고증, 통장사본 이미지 필수10mb 이하의 PDF 혹은 이미지 형식의 파일(e.g. jpg, png, gif 등)로 5개까지 업로드 가능합니다.' : '사업자등록증, 영업신고증, 통장사본 이미지 첨부'}
                  </span>
                </>
              )}
          </label>
          {!isMobile && (
          <div className={styles.button}>
            <label htmlFor="upload-button" className={styles['button--upload']}>
              <span>내 pc</span>
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
        hasFooter={false}
        isOpen={isOpen}
        onCancel={closeSearchShop}
        isOverflowVisible={false}
        modalSize="medium"
      >
        <SearchShop open={isOpen} onCancel={closeSearchShop} />
      </CustomModal>
      )}
    </>
  );
}
