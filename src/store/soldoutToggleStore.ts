import { create } from 'zustand';

interface ToggleState {
  isSoldOut: { [menuId: number]: boolean };
  setInitialSoldOutState: (menuId: number, isSoldOut: string | null) => void;
  toggleSoldOut: (menuId: number) => void;
}

const useToggleStore = create<ToggleState>((set) => ({
  isSoldOut: {},
  setInitialSoldOutState: (menuId: number, soldOut: string | null) => set((state) => ({
    isSoldOut: {
      ...state.isSoldOut,
      [menuId]: soldOut !== null,
    },
  })),
  toggleSoldOut: (menuId: number) => set((state) => {
    if (state.isSoldOut[menuId] !== undefined) {
      return {
        isSoldOut: {
          ...state.isSoldOut,
          [menuId]: !state.isSoldOut[menuId],
        },
      };
    }
    return state;
  }),
}));

export default useToggleStore;
