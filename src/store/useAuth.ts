import { create } from 'zustand';

interface Auth {
  emailInput: string;
  setEmailInput: (email: string) => void;
}

const useAuthStore = create<Auth>((set) => ({
  emailInput: '',
  setEmailInput: (email: string) => set({ emailInput: email }),
}));

export default useAuthStore;
