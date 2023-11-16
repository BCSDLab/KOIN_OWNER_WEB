import { create } from 'zustand';
import WEEK from 'utils/constant/week';

interface ModalStore {
  categoryState: [string, number];
  searchShopState: string,
  openTimeState: { [key in typeof WEEK[number]]: string | null },
  closeTimeState: { [key in typeof WEEK[number]]: string | null },
  shopClosedState: { [key: string]: boolean },
  setCategoryState: (state: [string, number]) => void,
  setSearchShopState: (state: string) => void,
  setOpenTimeState: (state: { [key in typeof WEEK[number]]: string | null }) => void,
  setCloseTimeState: (state: { [key in typeof WEEK[number]]: string | null }) => void,
  setShopClosedState: (state: { [key : string]: boolean }) => void,
}

const initialOperatingTime = {
  월: '00:00',
  화: '00:00',
  수: '00:00',
  목: '00:00',
  금: '00:00',
  토: '00:00',
  일: '00:00',
};

const initialShopClosed = {
  월: false,
  화: false,
  수: false,
  목: false,
  금: false,
  토: false,
  일: false,
};

const useModalStore = create<ModalStore>((set) => ({
  categoryState: ['', 0],
  searchShopState: '',
  openTimeState: initialOperatingTime,
  closeTimeState: initialOperatingTime,
  shopClosedState: initialShopClosed,
  setCategoryState: (state) => set({ categoryState: state }),
  setSearchShopState: (state) => set({ searchShopState: state }),
  setOpenTimeState: (state) => set(() => ({ openTimeState: state })),
  setCloseTimeState: (state) => set(() => ({ closeTimeState: state })),
  setShopClosedState: (state) => set({ shopClosedState: state }),
}));

export default useModalStore;
