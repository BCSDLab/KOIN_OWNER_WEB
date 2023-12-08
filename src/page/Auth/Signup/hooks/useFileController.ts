import useRegisterInfo from 'store/registerStore';

export default function useFileController() {
  const { ownerInfo, setOwnerInfo: setUploadedFiles } = useRegisterInfo();

  const addFiles = (files:File[]) => {
    if (ownerInfo.registerFiles) {
      setUploadedFiles({
        ...ownerInfo,
        registerFiles: [...files, ...ownerInfo.registerFiles].slice(0, 5),
      });
    } else {
      setUploadedFiles({
        ...ownerInfo,
        registerFiles: Array.from(files).slice(0, 5),
      });
    }
  };

  const deleteFile = (fileIndex:number) => {
    const files = ownerInfo.registerFiles!.filter((file, index) => fileIndex !== index);
    setUploadedFiles({
      ...ownerInfo,
      registerFiles: files.length > 0 ? files : null,
    });
  };

  return {
    deleteFile, addFiles,
  };
}
