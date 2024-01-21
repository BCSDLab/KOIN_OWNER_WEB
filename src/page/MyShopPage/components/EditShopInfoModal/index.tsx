import { useEffect, useState } from 'react';
import { ReactComponent as DeleteImgIcon } from 'assets/svg/addmenu/mobile-delete-new-image.svg';
import { MyShopInfoRes } from 'model/shopInfo/myShopInfo';
import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import useImageUpload from 'utils/hooks/useImageUpload';
import styles from './EditShopInfoModal.module.scss';

export default function EditShopInfoModal({ shopInfo }: { shopInfo: MyShopInfoRes }) {
  const [imageUrlList, setImageUrlList] = useState<string[]>(shopInfo.image_urls);
  const { imageFile, saveImgFile, imgRef } = useImageUpload();

  const handleDeleteImage = (image: string) => {
    setImageUrlList((prev) => prev.filter((imageUrls) => imageUrls !== image));
  };

  useEffect(() => {
    if (imageFile) {
      setImageUrlList((prev) => [...prev, imageFile]);
    }
  }, [imageFile]);

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <span>메인 사진 변경</span>
        <span className={styles['container__header--warning']}>(최대 이미지 3장)</span>
      </div>
      <div className={styles['container__modify-main-image']}>
        {imageUrlList.map((image, index) => (
          <div className={styles['main-image']} key={image}>
            <img src={image} alt={`Selected ${index + 1}`} className={styles['main-image__image']} />
            <button
              type="button"
              onClick={() => handleDeleteImage(image)}
              className={styles['main-image__delete-button']}
            >
              <DeleteImgIcon />
            </button>
          </div>
        ))}
        {imageUrlList.length < 3 && (
          <label className={styles['main-image__add-button']} htmlFor="mainMenuImage">
            <input
              type="file"
              accept="image/*"
              id="mainMenuImage"
              className={styles['main-image__add-file']}
              onChange={saveImgFile}
              ref={imgRef}
            />
            <ImgPlusIcon className={styles['main-image__add-image-icon']} />
            <span className={styles['main-image__add-caption']}>이미지 추가</span>
          </label>
        )}
      </div>
      <hr className={styles['container__horizontal-line']} />
    </div>
  );
}
