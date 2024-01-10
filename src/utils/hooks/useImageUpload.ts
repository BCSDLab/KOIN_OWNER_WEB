import { uploadFile } from 'api/uploadFile/Uploadfile';
import { useRef, useState } from 'react';

export default function useImageUpload() {
  const [imageFile, setImageFile] = useState('');
  const [isUploadError, setIsUploadError] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = async () => {
    const file = imgRef.current?.files?.[0];
    const reader = new FileReader();

    if (file) {
      const formData = new FormData();
      formData.append('multipartFile', file);
      try {
        const data = await uploadFile(formData);

        if (data?.data?.file_url) {
          setImageFile(`https://${data.data.file_url}`);
        }
      } catch (error) {
        if (error) {
          setIsUploadError(true);
        }
      }
      setIsUploadError(false);
      reader.readAsDataURL(file);
    }
  };

  return {
    imageFile, imgRef, saveImgFile, isUploadError,
  };
}
