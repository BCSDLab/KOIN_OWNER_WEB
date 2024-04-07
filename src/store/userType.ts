import { getUserType } from 'api/auth';
import { UserType } from 'model/auth';
import { create } from 'zustand';

interface UserTypeStore {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const useUserTypeStore = create<UserTypeStore>((set) => ({
  userType: 'NOT_LOGGED_IN',
  setUserType: async () => {
    const response = await getUserType();
    set({ userType: response ? response.user_type : 'NOT_LOGGED_IN' });
  },
}));

export default useUserTypeStore;
