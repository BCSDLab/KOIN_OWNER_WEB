import { useState, useRef } from 'react';

export default function useImageUpload() {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const { result } = reader;
      if (typeof result === 'string') {
        setImgFile(result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return { imgFile, imgRef, saveImgFile };
}
