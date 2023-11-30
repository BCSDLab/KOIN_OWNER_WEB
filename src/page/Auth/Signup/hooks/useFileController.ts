import { useEffect, useState } from 'react';

export default function useFileController(fileList :FileList) {
  const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);

  const addFiles = (files:FileList) => {
    setUploadedFiles((p) => [...Array.from(files), ...p].slice(0, 5));
  };
  const addFile = (file:File) => {
    setUploadedFiles((p) => [file, ...p].slice(0, 5));
  };
  const deleteFile = (fileIndex:number) => {
    setUploadedFiles(uploadedFiles.filter((file, index) => fileIndex !== index));
  };
  useEffect(() => {
    if (fileList) {
      addFiles(fileList);
    }
  }, [fileList]);

  return { uploadedFiles, addFile, deleteFile };
}
