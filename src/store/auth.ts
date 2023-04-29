import { NullableUser } from 'api/auth/model';
import { create } from 'zustand';

interface AuthStore {
  user: NullableUser;
  setUser: (auth: NullableUser) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (auth) => {
    set(() => ({ user: auth }));
  },
}));

export default useAuthStore;
