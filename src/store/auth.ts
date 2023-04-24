import { UserResponse } from 'model/auth';
import { SafeParseReturnType } from 'zod';
import { create } from 'zustand';

interface AuthStore {
  user: UserResponse | null | SafeParseReturnType<any, any>;
  setUser: (auth: UserResponse) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: async (auth:UserResponse) => {
    set(() => ({ user: auth }));
  },
}));

export default useAuthStore;
