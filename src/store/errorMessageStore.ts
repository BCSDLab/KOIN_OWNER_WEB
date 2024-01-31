import { create } from 'zustand';

interface ErrorMessageStore {
  menuError: string;
  setMenuError: (error: string) => void;
  categoryError: string;
  setCategoryError: (error: string) => void;
  loginError: string;
  setLoginError: (error: string) => void;
  emailError: string;
  setEmailError: (error: string) => void;
}

export const useErrorMessageStore = create<ErrorMessageStore>((set) => ({
  menuError: '',
  setMenuError: (error) => set({ menuError: error }),
  categoryError: '',
  setCategoryError: (error) => set({ categoryError: error }),
  loginError: '',
  setLoginError: (error) => set({ loginError: error }),
  emailError: '',
  setEmailError: (error) => set({ emailError: error }),
}));
