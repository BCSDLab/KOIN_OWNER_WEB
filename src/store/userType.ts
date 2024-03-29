import { UserType } from 'model/auth';
import { create } from 'zustand';

interface UserTypeStore {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const useUserTypeStore = create<UserTypeStore>((set) => ({
  userType: 'NOT_LOGGED_IN',
  setUserType: (userType) => set({ userType }),
}));

export default useUserTypeStore;
