import { getOwnerInfo } from 'api/auth';
import { User } from 'model/auth';
import { create } from 'zustand';

interface UserStore {
  user: User;
  setUser: () => Promise<void>;
  removeUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: async () => {
    const user = await getOwnerInfo();
    set(() => ({ user }));
  },
  removeUser: () => {
    set(() => ({ user: null }));
  },
}));

export default useUserStore;
