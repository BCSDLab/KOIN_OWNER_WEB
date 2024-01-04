import { useRef } from 'react';
import useAddMenuStore from 'store/addMenu';

export default function useMenuImageUpload() {
  const imgRef = useRef<HTMLInputElement>(null);
  const { setImageUrl } = useAddMenuStore();

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
    }
  };

  return { imgRef, saveImgFile };
}
