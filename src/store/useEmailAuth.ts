import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EmailAuth {
  email: string;
  setEmail: (email: string) => void;
}

const useEmailAuthStore = create(persist<EmailAuth>((set) => ({
  email: '',
  setEmail: (email: string) => set({ email }),
}), {
  name: 'email-storage',
  getStorage: () => sessionStorage,
}));

export default useEmailAuthStore;
