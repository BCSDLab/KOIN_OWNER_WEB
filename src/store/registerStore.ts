import { Owner } from 'page/Auth/Signup/types/Owner';
import { User } from 'page/Auth/Signup/types/User';
import { create } from 'zustand';

interface RegisterInfo {
  userInfo:User,
  ownerInfo:Owner
  setOwnerInfo:(data:Owner) => void,
  setUserInfo:(data:User) => void,
  resetRegisterInfo: () => void
}

const useRegisterInfo = create<RegisterInfo>((set) => ({
  userInfo: {},
  ownerInfo: {},
  setUserInfo: (data) => set({ userInfo: data }),
  setOwnerInfo: (data) => set({ ownerInfo: data }),
  resetRegisterInfo: () => set({
    userInfo: {},
    ownerInfo: {},
  }),
}));

export default useRegisterInfo;
