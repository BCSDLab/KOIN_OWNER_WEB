import { useRef } from 'react';
import useUploadFile from 'query/upload';
import useAddMenuStore from 'store/addMenu';

export default function useMenuImageUpload(closeModal: () => void) {
  const imgRef = useRef<HTMLInputElement>(null);
  const { setImageUrl } = useAddMenuStore();
  const { uploadFile } = useUploadFile();

  const saveImgFile = async () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('multipartFile', file);

      const data = await uploadFile(formData);

      if (data?.data?.file_url) {
        setImageUrl(data.data.file_url);
        closeModal();
      }
    }
  };

  return { imgRef, saveImgFile };
}
