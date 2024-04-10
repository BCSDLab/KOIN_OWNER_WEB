import { create } from 'zustand';

interface ErrorMessageStore {
  menuError: string;
  setMenuError: (error: string) => void;
  categoryError: string;
  setCategoryError: (error: string) => void;
  loginError: string;
  setLoginError: (error: string) => void;
  loginErrorStatus: number;
  setLoginErrorStatus: (error: number) => void;
}

export const useErrorMessageStore = create<ErrorMessageStore>((set) => ({
  menuError: '',
  setMenuError: (error) => set({ menuError: error }),
  categoryError: '',
  setCategoryError: (error) => set({ categoryError: error }),
  loginError: '',
  setLoginError: (error) => set({ loginError: error }),
  loginErrorStatus: 0,
  setLoginErrorStatus: (error) => set({ loginErrorStatus: error }),
}));
