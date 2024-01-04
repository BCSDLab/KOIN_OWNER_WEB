import { useRef, useState } from 'react';

export default function useImageUpload() {
  const [imgUrl, setImgUrl] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const { result } = reader;
      if (typeof result === 'string') {
        setImgUrl(result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return { imgUrl, imgRef, saveImgFile };
}
