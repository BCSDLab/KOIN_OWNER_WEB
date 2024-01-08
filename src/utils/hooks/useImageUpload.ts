import { useRef, useState } from 'react';

export default function useImageUpload() {
  const [imageFile, setImageFile] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const { result } = reader;
      if (typeof result === 'string') {
        setImageFile(result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return { imageFile, imgRef, saveImgFile };
}
