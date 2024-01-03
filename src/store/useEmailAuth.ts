import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface EmailAuth {
  email: string;
  setEmail: (email: string) => void;
}

const useEmailAuthStore = create(persist<EmailAuth>((set) => ({
  email: '',
  setEmail: (email: string) => set({ email }),
}), {
  name: 'email-storage',
  storage: createJSONStorage(() => sessionStorage),
}));

export default useEmailAuthStore;
