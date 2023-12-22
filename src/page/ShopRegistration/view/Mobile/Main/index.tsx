import { ReactComponent as EmptyImgIcon } from 'assets/svg/shopRegistration/mobile-empty-img.svg';
import useStepStore from 'store/useStepStore';
import useImageUpload from 'utils/hooks/useImageUpload';
import styles from './Main.module.scss';

export default function Main() {
  const { increaseStep } = useStepStore();
  const { imgFile, imgRef, saveImgFile } = useImageUpload();

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
        {imgFile
          ? <img src={imgFile} className={styles['form__main-menu']} alt="" />
          : (
            <>
              <EmptyImgIcon />
              <span className={styles.form__text}>등록된 이미지가 없습니다.</span>
            </>
          )}
      </label>
      <label htmlFor="name" className={styles.form__label}>
        가게명
        <input type="text" id="name" className={styles.form__input} />
      </label>
      <label htmlFor="address" className={styles.form__label}>
        주소정보
        <input type="text" id="address" className={styles.form__input} />
      </label>
      <div className={styles.form__button}>
        <button type="button" onClick={increaseStep}>다음</button>
      </div>
    </div>
  );
}
