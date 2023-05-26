import { User } from 'model/auth';
import { create } from 'zustand';

interface UserStore {
  user: User;
  setUser: (auth: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (auth) => {
    set(() => ({ user: auth }));
  },
}));

export default useUserStore;
