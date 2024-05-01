import { isKoinError } from '@bcsdlab/koin';
import { getUserType } from 'api/auth';
import { UserType } from 'model/auth';
import { create } from 'zustand';
import { useErrorMessageStore } from './errorMessageStore';

interface UserTypeStore {
  userType: UserType;
  updateUserType: () => void;
}

const useUserTypeStore = create<UserTypeStore>((set) => ({
  userType: null,
  updateUserType: async () => {
    try {
      const response = await getUserType();
      const newUserType = response.user_type;
      set((state) => {
        if (newUserType !== state.userType) {
          return { userType: newUserType };
        }
        return state;
      });
    } catch (err) {
      set((state) => (state.userType !== null ? { userType: null } : state));
      if (isKoinError(err)) {
        useErrorMessageStore.getState().setLoginErrorStatus(err.status);
      }
    }
  },
}));

export default useUserTypeStore;
