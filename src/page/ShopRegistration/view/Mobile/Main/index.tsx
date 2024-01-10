/* eslint-disable react-hooks/exhaustive-deps */
import { ReactComponent as EmptyImgIcon } from 'assets/svg/shopRegistration/mobile-empty-img.svg';
import useStepStore from 'store/useStepStore';
import useImageUpload from 'utils/hooks/useImageUpload';
import useShopRegistrationStore from 'store/shopRegistration';
import { useEffect, useState } from 'react';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import cn from 'utils/ts/className';
import styles from './Main.module.scss';

export default function Main() {
  const [isError, setIsError] = useState(false);
  const { increaseStep } = useStepStore();
  const {
    imageFile, imgRef, saveImgFile, isUploadError,
  } = useImageUpload();
  const {
    name, setName, address, setAddress, imageUrl, setImageUrl,
  } = useShopRegistrationStore();

  const handleNextClick = () => {
    if (name === '' || address === '' || imageUrl === '') {
      setIsError(true);
    } else {
      setIsError(false);
      increaseStep();
    }
  };

  useEffect(() => {
    if (imageFile !== '') setImageUrl(imageFile);
  }, [imageFile]);
  return (
    <div className={styles.form}>
      <label
        className={cn({
          [styles['form__image-upload']]: true,
          [styles['form__image-upload--error']]: imageUrl === '' && isError,
        })}
        htmlFor="mainMenuImage"
      >
        <input
          type="file"
          accept="image/*"
          id="mainMenuImage"
          className={styles['form__upload-file']}
          onChange={saveImgFile}
          ref={imgRef}
        />
        {imageUrl
          ? <img src={imageUrl} className={styles['form__main-menu']} alt="메인 메뉴" />
          : (
            <>
              <EmptyImgIcon />
              <span className={styles.form__text}>등록된 이미지가 없습니다.</span>
            </>
          )}
      </label>
      <div className={styles['form__image-error-message']}>
        {imageUrl === '' && isError && <ErrorMessage message={ERRORMESSAGE.image} />}
        {imageUrl !== '' && isUploadError && <ErrorMessage message={ERRORMESSAGE.imageUpload} />}
      </div>
      <label
        htmlFor="name"
        className={cn({
          [styles.form__label]: true,
          [styles['form__label--error']]: name === '' && isError,
        })}
      >
        가게명
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={styles.form__input}
        />
      </label>
      <div className={styles['form__error-message']}>
        {name === '' && isError && <ErrorMessage message={ERRORMESSAGE.name} />}
      </div>
      <label
        htmlFor="address"
        className={cn({
          [styles.form__label]: true,
          [styles['form__label--error']]: address === '' && isError,
        })}
      >
        주소정보
        <input
          type="text"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className={styles.form__input}
        />
      </label>
      <div className={styles['form__error-message']}>
        {address === '' && isError && <ErrorMessage message={ERRORMESSAGE.address} />}
      </div>
      <div className={styles.form__button}>
        <button type="button" onClick={handleNextClick}>다음</button>
      </div>
    </div>
  );
}
