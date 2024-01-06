import useRegisterInfo from 'store/registerStore';

export default function useFileController() {
  const { ownerInfo, setOwnerInfo } = useRegisterInfo();

  const addFiles = (files:File[]) => {
    if (ownerInfo.registerFiles) {
      setOwnerInfo({
        ...ownerInfo,
        registerFiles: [...files, ...ownerInfo.registerFiles].slice(0, 5),
      });
    } else {
      setOwnerInfo({
        ...ownerInfo,
        registerFiles: Array.from(files).slice(0, 5),
      });
    }
  };

  const deleteFile = (fileIndex:number) => {
    const files = ownerInfo.registerFiles!.filter((file, index) => fileIndex !== index);
    setOwnerInfo({
      ...ownerInfo,
      registerFiles: files.length > 0 ? files : null,
    });
  };

  return {
    deleteFile, addFiles,
  };
}
