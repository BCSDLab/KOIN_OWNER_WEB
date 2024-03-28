import { uploadFile } from 'api/uploadFile/Uploadfile';
import { useRef, useState } from 'react';
import showToast from 'utils/ts/showToast';

// 정의할 수 있는 에러 타입
type UploadError = '413' | '415' | '404' | '422' | 'networkError' | '401' | '';

/* eslint-disable */
export default function useImagesUpload() {
  const [imageFile, setImageFile] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<UploadError>('');
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = async () => {
    const files = imgRef.current?.files;

    if (files && (files.length > 3 || imageFile.length >= 3)) {
      showToast('error', '파일은 3개까지 등록할 수 있습니다.')
      return;
    }

    if (files && files.length) {
      const uploadedFiles: string[] = [];
      const maxSize = 1024 * 1024 * 10; // 10 MB limit for each file
      const correctForm = new RegExp('(.*?)\\.(jpg|jpeg|gif|bmp|png)$');

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > maxSize) {
          setUploadError('413'); // File size too large
          setImageFile([]);
          return;
        }

        if (!correctForm.test(file.name)) {
          setUploadError('415'); // Unsupported file type
          setImageFile([]);
          return;
        }

        const formData = new FormData();
        formData.append('multipartFile', file);

        try {
          const data = await uploadFile(formData);
          if (data?.data?.file_url) {
            uploadedFiles.push(data.data.file_url);
          }
        } catch (error: any) {
          setImageFile([]);
          const errorMessage = error.toString();
          if (errorMessage.includes('415')) {
            setUploadError('415');
          } else if (errorMessage.includes('404')) {
            setUploadError('404');
          } else if (errorMessage.includes('422')) {
            setUploadError('422');
          } else if (errorMessage.includes('Network Error')) {
            setUploadError('networkError');
          } else {
            setUploadError('401');
          }
          return;
        }
      }

      setImageFile(uploadedFiles);
      setUploadError('');
    }
  };

  return {
    imageFile, imgRef, saveImgFile, uploadError,
  };
}
