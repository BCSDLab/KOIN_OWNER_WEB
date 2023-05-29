import { User } from 'model/auth';
import { create } from 'zustand';

interface UserStore {
  user: User;
  setUserStore: (auth: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUserStore: (auth) => {
    set(() => ({ user: auth }));
  },
}));

export default useUserStore;
