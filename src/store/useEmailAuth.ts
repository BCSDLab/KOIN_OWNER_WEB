import { create } from 'zustand';

interface EmailAuth {
  email: string;
  setEmail: (email: string) => void;
}

const useEmailAuthStore = create<EmailAuth>((set) => ({
  email: '',
  setEmail: (email: string) => set({ email }),
}));

export default useEmailAuthStore;
