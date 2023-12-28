import { create } from 'zustand';

interface EmailAuth {
  emailInput: string;
  setEmailInput: (email: string) => void;
}

const useEmailAuthStore = create<EmailAuth>((set) => ({
  emailInput: '',
  setEmailInput: (email: string) => set({ emailInput: email }),
}));

export default useEmailAuthStore;
