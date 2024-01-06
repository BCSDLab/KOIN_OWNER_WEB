import { create } from 'zustand';

interface OptionPrices {
  id: number;
  option: string;
  price: number | string;
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
}

const useAddMenuStore = create<AddMenuStore>((set) => ({
  categoryIds: [],
  description: '',
  imageUrl: [],
  isSingle: false,
  name: '',
  optionPrices: [],
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
}));

export default useAddMenuStore;
