import { User } from 'model/auth';
import { create } from 'zustand';

interface AuthStore {
  user: User;
  setUser: (auth: User) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (auth) => {
    set(() => ({ user: auth }));
  },
}));

export default useAuthStore;
