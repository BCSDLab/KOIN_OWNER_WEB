import { uploadFile } from 'api/uploadFile/Uploadfile';
import { useRef, useState } from 'react';

export default function useImageUpload() {
  const [imageFile, setImageFile] = useState('');
  const [uploadError, setUploadError] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = async () => {
    const file = imgRef.current?.files?.[0];
    const reader = new FileReader();

    if (file) {
      const formData = new FormData();
      formData.append('multipartFile', file);

      const maxSize = 1024 * 1024 * 10;
      if (file.size > maxSize) {
        setUploadError('413');
        setImageFile('');
        return;
      }

      const correctForm = /(.*?)\.(jpg|jpeg|gif|bmp|png)$/;
      if (file.name.match(correctForm) === null) {
        setUploadError('415');
        setImageFile('');
        return;
      }
      try {
        const data = await uploadFile(formData);

        if (data?.data?.file_url) {
          setImageFile(data.data.file_url);
        }
        setUploadError('');
      } catch (error) {
        setImageFile('');
        switch (error) {
          case 'Request failed with status code 415':
            setUploadError('415');
            break;
          case 'Request failed with status code 404':
            setUploadError('404');
            break;
          case 'Request failed with status code 422':
            setUploadError('422');
            break;
          case 'Network Error':
            setUploadError('networkError');
            break;
          default:
            setUploadError('401');
        }
      }
      reader.readAsDataURL(file);
    }
  };

  return {
    imageFile, imgRef, saveImgFile, uploadError,
  };
}
