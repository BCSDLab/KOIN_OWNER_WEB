import { useRef } from 'react';
import useShopRegistrationStore from 'store/shopRegistration';

export default function useImageUpload() {
  const { imageUrl, setImageUrl } = useShopRegistrationStore();
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const { result } = reader;
      if (typeof result === 'string') {
        setImageUrl(result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return { imageUrl, imgRef, saveImgFile };
}
