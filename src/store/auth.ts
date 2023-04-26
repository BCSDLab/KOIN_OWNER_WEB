import { UserResponse } from 'model/auth';
import { create } from 'zustand';

interface AuthStore {
  user: UserResponse | null;
  setUser: (auth: UserResponse) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (auth:UserResponse) => {
    set(() => ({ user: auth }));
  },
}));

export default useAuthStore;
