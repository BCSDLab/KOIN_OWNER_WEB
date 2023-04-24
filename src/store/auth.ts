import { UserResponse } from 'model/auth';
import { create } from 'zustand';

interface AuthStore {
  user: UserResponse | null;
  setUser: (auth: UserResponse) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: async (auth:UserResponse) => {
    set(() => ({ user: auth }));
  },
}));

export default useAuthStore;
