import { create } from 'zustand';
import { MonoMenu } from 'model/shopInfo/menuCategory';

export type OptionPrices = {
  id: number;
  option: string;
  price: number;
};

interface AddMenuStore {
  menuId: number;
  categoryIds: number[];
  description: string;
  imageUrl: string[];
  isSingle: boolean;
  name: string;
  optionPrices: OptionPrices[] | null;
  singlePrice: number;
  setCategoryIds: (categoryIds: number[]) => void;
  setDescription: (description: string) => void;
  setImageUrl: (newImageUrl: string) => void;
  setImageUrls: (newImageUrls: string[]) => void,
  removeImageUrl: (imageUrlToRemove: string) => void;
  setIsSingle: (isSingle: boolean) => void;
  setName: (name: string) => void;
  setOptionPrices: (optionPrices: OptionPrices[]) => void;
  setSinglePrice: (singlePrice: number) => void;
  resetOptionPrice: () => void;
  resetAddMenuStore: () => void;
  resetCategoryIds: () => void;
  setMenuInfo: (menuData : MonoMenu) => void;
  resetMenuName: () => void;
}

const useAddMenuStore = create<AddMenuStore>((set) => ({
  menuId: 0,
  categoryIds: [],
  description: '',
  imageUrl: [],
  isSingle: true,
  name: '',
  optionPrices: null,
  singlePrice: 0,
  setCategoryIds: (categoryIds) => set({ categoryIds }),
  setDescription: (description) => set({ description }),
  setImageUrl: (newImageUrl) => set((state) => ({
    imageUrl: [...state.imageUrl, newImageUrl],
  })),
  setImageUrls: (newImageUrl) => set(() => ({
    imageUrl: newImageUrl,
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
    isSingle: true,
    name: '',
    optionPrices: null,
    singlePrice: 0,
  }),
  resetCategoryIds: () => set({ categoryIds: [] }),
  setMenuInfo: (menuData: MonoMenu) => {
    if ('option_prices' in menuData) {
      const newOptionPrices = menuData.option_prices?.map((param, index) => ({
        id: index,
        option: param.option,
        price: param.price,
      }));

      set({
        menuId: menuData.id,
        categoryIds: menuData.category_ids,
        description: menuData.description !== null ? menuData.description : undefined,
        imageUrl: menuData.image_urls,
        isSingle: menuData.is_single,
        name: menuData.name,
        optionPrices: newOptionPrices,
        singlePrice: menuData.single_price !== null ? menuData.single_price : undefined,
      });
    }
  },
  resetMenuName: () => set({ name: '' }),
}));

export default useAddMenuStore;
