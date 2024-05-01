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
    if (sessionStorage.getItem('access_token') && sessionStorage.getItem('user_type')) {
      set((state) => {
        if (sessionStorage.getItem('user_type') !== state.userType) {
          return { userType: sessionStorage.getItem('user_type') as UserType };
        }
        return state;
      });
      return;
    }

    try {
      const response = await getUserType();
      const newUserType = response.user_type;
      set((state) => {
        if (newUserType !== state.userType) {
          sessionStorage.setItem('user_type', newUserType);
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
