import { create } from 'zustand';
import WEEK from 'utils/constant/week';

interface ModalStore {
  categoryState: string | undefined,
  searchStoreState: string | undefined,
  openTimeState: { [key in typeof WEEK[number]]: string },
  closeTimeState: { [key in typeof WEEK[number]]: string },
  storeClosedState: { [key: string]: boolean },
  setCategoryState: (state: string) => void,
  setSearchStoreState: (state: string) => void,
  setOpenTimeState: (state: { [key in typeof WEEK[number]]: string }) => void,
  setCloseTimeState: (state: { [key in typeof WEEK[number]]: string }) => void,
  setStoreClosedState: (state: { [key : string]: boolean }) => void,
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

const initialStoreClosed = {
  월: false,
  화: false,
  수: false,
  목: false,
  금: false,
  토: false,
  일: false,
};

const useModalStore = create<ModalStore>((set) => ({
  categoryState: undefined,
  searchStoreState: undefined,
  openTimeState: initialOperatingTime,
  closeTimeState: initialOperatingTime,
  storeClosedState: initialStoreClosed,
  setCategoryState: (state) => set({ categoryState: state }),
  setSearchStoreState: (state) => set({ searchStoreState: state }),
  setOpenTimeState: (state) => set(() => ({ openTimeState: state })),
  setCloseTimeState: (state) => set(() => ({ closeTimeState: state })),
  setStoreClosedState: (state) => set({ storeClosedState: state }),
}));

export default useModalStore;
