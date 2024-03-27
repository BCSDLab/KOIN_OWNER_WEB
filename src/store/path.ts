import { create } from 'zustand';

interface PrevPathStore {
  prevPath: string;
  setPrevPath: (prevPath: string) => void;
}

const usePrevPathStore = create<PrevPathStore>((set) => ({
  prevPath: '/shop-registration',
  setPrevPath: (prevPath) => { set(() => ({ prevPath })); },
}));

export default usePrevPathStore;
