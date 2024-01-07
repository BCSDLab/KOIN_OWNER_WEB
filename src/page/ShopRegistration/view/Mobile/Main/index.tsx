/* eslint-disable react-hooks/exhaustive-deps */
import { ReactComponent as EmptyImgIcon } from 'assets/svg/shopRegistration/mobile-empty-img.svg';
import useStepStore from 'store/useStepStore';
import useImageUpload from 'utils/hooks/useImageUpload';
import useShopRegistrationStore from 'store/shopRegistration';
import { useEffect } from 'react';
import styles from './Main.module.scss';

export default function Main() {
  const { increaseStep } = useStepStore();
  const { imageFile, imgRef, saveImgFile } = useImageUpload();
  const {
    name, setName, address, setAddress, imageUrl, setImageUrl,
  } = useShopRegistrationStore();

  useEffect(() => {
    if (imageFile !== '') setImageUrl(imageFile);
  }, [imageFile]);
  return (
    <div className={styles.form}>
      <label className={styles['form__image-upload']} htmlFor="mainMenuImage">
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
      <label htmlFor="name" className={styles.form__label}>
        가게명
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={styles.form__input}
        />
      </label>
      <label htmlFor="address" className={styles.form__label}>
        주소정보
        <input
          type="text"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className={styles.form__input}
        />
      </label>
      <div className={styles.form__button}>
        <button type="button" onClick={increaseStep}>다음</button>
      </div>
    </div>
  );
}
