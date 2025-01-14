import EmptyImgIcon from 'assets/svg/shopRegistration/mobile-empty-img.svg?react';
import MobileDeleteImgIcon from 'assets/svg/addmenu/mobile-delete-new-image.svg?react';
import { useEffect } from 'react';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import ErrorMessage from 'component/common/ErrorMessage';
import cn from 'utils/ts/className';
import useImagesUpload from 'utils/hooks/useImagesUpload';
import { useFormContext, useWatch } from 'react-hook-form';
import styles from './Main.module.scss';

export default function Main({ onNext, onPrev }:{
  onNext: () => void, onPrev: () => void
}) {
  const {
    register, control, setValue, trigger, formState: { errors },
  } = useFormContext();

  const imageUrls = useWatch({ control, name: 'image_urls' });

  const {
    imageFile, imgRef, saveImgFile, uploadError, setImageFile,
  } = useImagesUpload();

  const handleDeleteImage = (url: string) => {
    setImageFile(imageFile.filter((img) => img !== url));
  };

  useEffect(() => {
    if (imageFile.length > 0) {
      setValue('image_urls', imageFile);
    }
  }, [imageFile, setValue]);

  const handleNextClick = async () => {
    const isValid = await trigger(['image_urls', 'name', 'address']);
    if (!isValid) {
      return;
    }
    onNext();
  };

  return (
    <div className={styles.form}>
      <label
        className={cn({
          [styles['form__image-upload']]: true,
          [styles['form__image-upload--error']]: uploadError !== '' || errors.image_urls !== undefined,
        })}
        htmlFor="mainMenuImage"
      >
        <input
          type="file"
          accept="image/*"
          id="mainMenuImage"
          className={styles['form__upload-file']}
          {...register('image_urls', { required: true })}
          ref={imgRef}
          onChange={saveImgFile}
        />
        {imageUrls.length !== 0
          ? (
            <div className={styles['form__main-menu']}>
              {imageUrls.map((url: string) => (
                <>
                  <img key={url} src={url} className={styles['form__main-menu-image']} alt="대표 이미지" />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(url)}
                    className={styles['form__delete-img-button']}
                    aria-label="Delete image"
                  >
                    <MobileDeleteImgIcon />
                  </button>
                </>
              ))}
            </div>
          )
          : (
            <>
              <EmptyImgIcon />
              <span className={styles.form__text}>등록된 이미지가 없습니다.</span>
              <span className={styles['form__text--recommend']}>이곳을 눌러 이미지를 등록해 보세요!</span>
            </>
          )}
      </label>
      <div className={styles['form__image-error-message']}>
        {errors.image_urls && <ErrorMessage message={ERRORMESSAGE.image} />}
        {uploadError !== '' && <ErrorMessage message={ERRORMESSAGE[uploadError]} />}
      </div>
      <label
        htmlFor="shopName"
        className={cn({
          [styles.form__label]: true,
          [styles['form__label--error']]: errors.name !== undefined,
        })}
      >
        가게명
        <input
          type="text"
          id="shopName"
          className={styles.form__input}
          {...register('name', { required: true })}
        />
      </label>
      <div className={styles['form__error-message']}>
        {errors.name && <ErrorMessage message={ERRORMESSAGE.name} />}
      </div>
      <label
        htmlFor="shopAddress"
        className={cn({
          [styles.form__label]: true,
          [styles['form__label--error']]: errors.address !== undefined,
        })}
      >
        주소정보
        <input
          type="text"
          id="shopAddress"
          className={styles.form__input}
          {...register('address', { required: true })}
        />
      </label>
      <div className={styles['form__error-message']}>
        {errors.address && <ErrorMessage message={ERRORMESSAGE.address} />}
      </div>
      <div className={styles.form__footer}>
        <button
          className={styles.form__cancel}
          type="button"
          onClick={onPrev}
        >
          취소
        </button>
        <button
          className={cn({
            [styles.form__next]: true,
          })}
          type="button"
          onClick={handleNextClick}
        >
          확인
        </button>
      </div>
    </div>
  );
}
