import { useMutation } from '@tanstack/react-query';
import { uploadFile, uploadFiles } from 'api/uploadFile/Uploadfile';

const useUploadFile = () => {
  const uploadFileMutation = useMutation({
    mutationFn: (formData: FormData) => uploadFile(formData),
  });

  const uploadFilesMutation = useMutation({
    mutationFn: (formData: FormData) => uploadFiles(formData),
  });

  return {
    uploadFile: uploadFileMutation.mutateAsync,
    uploadFileError: uploadFileMutation.isError,
    uploadFiles: uploadFilesMutation.mutateAsync,
    uploadFilesError: uploadFilesMutation.isError,
  };
};

export default useUploadFile;
