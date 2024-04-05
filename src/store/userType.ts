import { UserType } from 'model/auth';
import { create } from 'zustand';

interface UserTypeStore {
  userType: UserType;
  isAuth: boolean;
  setUserType: (type: UserType) => void;
  setIsAuth: (auth: boolean) => void;
}

const useUserTypeStore = create<UserTypeStore>((set) => ({
  userType: 'NOT_LOGGED_IN',
  isAuth: false,
  setUserType: (userType) => set({ userType }),
  setIsAuth: (isAuth) => set({ isAuth }),
}));

export default useUserTypeStore;
