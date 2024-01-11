import { create } from 'zustand';

interface ShopRegistrationStore {
  address: string;
  category: string;
  categoryId: number;
  deliveryPrice: number | string;
  description: string;
  imageUrl: string;
  name: string;
  phone: string;
  delivery: boolean;
  payBank: boolean;
  payCard: boolean;
  shopId:null | number;
  setAddress: (address: string) => void;
  setCategory: (category: string) => void;
  setCategoryId: (categoryId: number) => void;
  setDeliveryPrice: (deliveryPrice: number | string) => void;
  setDescription: (description: string) => void;
  setImageUrl: (imageUrl: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setDelivery: (delivery: boolean) => void;
  setPayBank: (payBank: boolean) => void;
  setPayCard: (payCard: boolean) => void;
}

const useShopRegistrationStore = create<ShopRegistrationStore>((set) => ({
  address: '',
  category: '',
  categoryId: 0,
  deliveryPrice: '',
  description: '',
  imageUrl: '',
  name: '',
  phone: '',
  delivery: false,
  payBank: false,
  payCard: false,
  shopId: null,
  setAddress: (address: string) => set({ address }),
  setCategory: (category: string) => set({ category }),
  setCategoryId: (categoryId: number) => set({ categoryId }),
  setDeliveryPrice: (deliveryPrice: number | string) => set({ deliveryPrice }),
  setDescription: (description: string) => set({ description }),
  setImageUrl: (imageUrl: string) => set({ imageUrl }),
  setName: (name: string) => set({ name }),
  setPhone: (phone: string) => set({ phone }),
  setDelivery: (delivery: boolean) => set({ delivery }),
  setPayBank: (payBank: boolean) => set({ payBank }),
  setPayCard: (payCard: boolean) => set({ payCard }),
}));

export default useShopRegistrationStore;
