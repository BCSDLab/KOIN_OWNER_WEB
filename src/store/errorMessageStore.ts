import { create } from 'zustand';

interface ErrorMessageStore {
  menuError: string;
  setMenuError: (error: string) => void;
  categoryError: string;
  setCategoryError: (error: string) => void;
  loginError: string;
  setLoginError: (error: string) => void;
  loginErrorCode: number;
  setLoginErrorCode: (error: number) => void;
  logoutError: string;
  setLogoutError: (error: string) => void;
  logoutErrorCode: number;
  setLogoutErrorCode: (error: number) => void;
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
  loginErrorCode: 0,
  setLoginErrorCode: (error) => set({ loginErrorCode: error }),
  logoutError: '',
  setLogoutError: (error) => set({ loginError: error }),
  logoutErrorCode: 0,
  setLogoutErrorCode: (error) => set({ loginErrorCode: error }),
  loginErrorStatus: 0,
  setLoginErrorStatus: (error) => set({ loginErrorStatus: error }),
}));
