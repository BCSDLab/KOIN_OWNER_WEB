import { create } from 'zustand';
import { Menu } from 'model/shopInfo/menuCategory';

interface OptionPrices {
  option: string;
  price: number;
}

interface AddMenuStore {
  menuId: number;
  categoryIds: number[];
  description: string;
  imageUrl: string[];
  isSingle: boolean;
  name: string;
  optionPrices: OptionPrices[] | null;
  singlePrice: number | null;
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
  setMenuInfo: (menuData : Menu) => void;
}

const useAddMenuStore = create<AddMenuStore>((set) => ({
  menuId: 0,
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
  resetOptionPrice: () => set({ optionPrices: [{ option: '', price: 0 }] }),
  resetAddMenuStore: () => set({
    categoryIds: [],
    description: '',
    imageUrl: [],
    isSingle: false,
    name: '',
    optionPrices: [{ option: '', price: 0 }],
    singlePrice: 0,
  }),
  setMenuInfo: (menuData) => {
    set({
      menuId: menuData.id,
      categoryIds: menuData.category_ids,
      description: menuData.description !== null ? menuData.description : undefined,
      imageUrl: menuData.image_urls,
      isSingle: menuData.is_single,
      name: menuData.name,
      optionPrices: menuData.option_prices,
      singlePrice: menuData.single_price,
    });
  },
}));

export default useAddMenuStore;
