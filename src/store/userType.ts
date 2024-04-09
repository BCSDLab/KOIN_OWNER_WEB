import { getUserType } from 'api/auth';
import { UserType } from 'model/auth';
import { create } from 'zustand';

interface UserTypeStore {
  userType: UserType;
  setUserType: () => void;
}

const useUserTypeStore = create<UserTypeStore>((set) => ({
  userType: null,
  setUserType: async () => {
    try {
      const response = await getUserType();
      const newUserType = response.user_type;
      set((state) => {
        if (newUserType !== state.userType) {
          return { userType: newUserType };
        }
        return state;
      });
    } catch {
      set((state) => (state.userType !== null ? { userType: null } : state));
    }
  },
}));

export default useUserTypeStore;
