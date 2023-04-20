import { getMe } from 'api/auth';
import { UserResponse } from 'model/auth';
import { create } from 'zustand';

export const getUser = async () => {
  const token = sessionStorage.getItem('token');

  try {
    if (token) {
      const authResponse = await getMe(token);
      console.log(authResponse);
      return authResponse;
    }
  } catch (e) {
    console.log(e);
    sessionStorage.removeItem('token');
  }
  return null;
};

interface AuthStore {
  user: UserResponse | null;
  setUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: async () => {
    const auth = await getUser();
    set(() => ({ user: auth }));
  },
}));
