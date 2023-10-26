import { create } from 'zustand';

interface UploadToken {
  uploadToken:string | null,
  setUploadToken:(token:string) => void,
  removeToken:()=>void
}

const useUploadToken = create<UploadToken>((set) => ({
  uploadToken: null,
  setUploadToken: (token) => set({ uploadToken: token }),
  removeToken: () => set({ uploadToken: null }),
}));

export default useUploadToken;
