import { create } from 'zustand';

interface PrevPathStore {
  prevPath: string;
  setPrevPath: (prevPath?: string) => void;
}

const usePrevPathStore = create<PrevPathStore>((set) => ({
  prevPath: '/store-registration',
  setPrevPath: () => { set(() => ({ prevPath: '/store-registration' })); },
}));

export default usePrevPathStore;
