import { create } from 'zustand';

interface OptionPrices {
  id: number;
  option: string;
  price: number;
}

interface AddMenuStore {
  categoryIds: number[];
  description: string;
  imageUrl: string[];
  isSingle: boolean;
  name: string;
  optionPrices: OptionPrices[];
  singlePrice: number;
  setCategoryIds: (categoryIds: number[]) => void;
  setDescription: (description: string) => void;
  setImageUrl: (newImageUrl: string) => void;
  removeImageUrl: (imageUrlToRemove: string) => void;
  setIsSingle: (isSingle: boolean) => void;
  setName: (name: string) => void;
  setOptionPrices: (optionPrices: OptionPrices[]) => void;
  setSinglePrice: (singlePrice: number) => void;
  resetOptionPrice: () => void;
  resetAddMenuStore: () => void;
  resetCategoryIds: () => void;
  resetMenuName: () => void;
}

const useAddMenuStore = create<AddMenuStore>((set) => ({
  categoryIds: [],
  description: '',
  imageUrl: [],
  isSingle: false,
  name: '',
  optionPrices: [{ id: 0, option: '', price: 0 }],
  singlePrice: 0,
  setCategoryIds: (categoryIds) => set({ categoryIds }),
  setDescription: (description) => set({ description }),
  setImageUrl: (newImageUrl) => set((state) => ({
    imageUrl: [...state.imageUrl, newImageUrl],
  })),
  removeImageUrl: (imageUrlToRemove) => set((state) => ({
    imageUrl: state.imageUrl.filter((img) => img !== imageUrlToRemove),
  })),
  setIsSingle: (isSingle) => set({ isSingle }),
  setName: (name) => set({ name }),
  setOptionPrices: (optionPrices) => set({ optionPrices }),
  setSinglePrice: (singlePrice) => set({ singlePrice }),
  resetOptionPrice: () => set({ optionPrices: [{ id: 0, option: '', price: 0 }] }),
  resetAddMenuStore: () => set({
    categoryIds: [],
    description: '',
    imageUrl: [],
    isSingle: false,
    name: '',
    optionPrices: [{ id: 0, option: '', price: 0 }],
    singlePrice: 0,
  }),
  resetCategoryIds: () => set({ categoryIds: [] }),
  resetMenuName: () => set({ name: '' }),
}));

export default useAddMenuStore;
