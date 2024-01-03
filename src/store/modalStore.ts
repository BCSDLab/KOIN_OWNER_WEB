import { create } from 'zustand';
import { WEEK } from 'utils/constant/week';

type OperatingTime = { [key in typeof WEEK[number]]: string | null };

interface ModalStore {
  openTimeState: OperatingTime;
  closeTimeState: OperatingTime;
  shopClosedState: { [key: string]: boolean };
  setOpenTimeState: (state: OperatingTime) => void;
  setCloseTimeState: (state: OperatingTime) => void;
  setShopClosedState: (state: { [key: string]: boolean }) => void;
}

const initialOperatingTime: OperatingTime = {
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
  openTimeState: initialOperatingTime,
  closeTimeState: initialOperatingTime,
  shopClosedState: initialShopClosed,
  setOpenTimeState: (state) => set(() => ({ openTimeState: state })),
  setCloseTimeState: (state) => set(() => ({ closeTimeState: state })),
  setShopClosedState: (state) => set({ shopClosedState: state }),
}));

export default useModalStore;
