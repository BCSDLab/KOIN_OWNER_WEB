import { persist } from 'zustand/middleware';
import { isKoinError } from '@bcsdlab/koin';
import { getUserType } from 'api/auth';
import { UserType } from 'model/auth';
import { create } from 'zustand';
import { useErrorMessageStore } from './errorMessageStore';

interface UserTypeStore {
  userType: UserType | null;
  updateUserType: () => void;
}

const sessionStorageWrapper = {
  getItem: (name: string) => {
    const value = sessionStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: any) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  },
};

const useUserTypeStore = create<UserTypeStore>()(
  persist(
    (set, get) => ({
      userType: null,
      updateUserType: async () => {
        if (sessionStorage.getItem('access_token') && sessionStorage.getItem('user_type')) {
          const userType = sessionStorage.getItem('user_type') as UserType;
          if (userType !== get().userType) {
            set({ userType });
          }
          return;
        }

        try {
          const response = await getUserType();
          const newUserType = response.user_type;
          if (newUserType !== get().userType) {
            set({ userType: newUserType });
            sessionStorage.setItem('user_type', newUserType);
          }
        } catch (err) {
          if (get().userType !== null) {
            set({ userType: null });
          }
          if (isKoinError(err)) {
            useErrorMessageStore.getState().setLoginErrorStatus(err.status);
          }
        }
      },
    }),
    {
      name: 'userTypeStore',
      storage: sessionStorageWrapper,
    },
  ),
);

export default useUserTypeStore;
