import { create } from 'zustand';

interface ShopRegistrationStore {
  address: string;
  categoryId: number;
  deliveryPrice: number;
  description: string;
  imageUrl: string;
  name: string;
  phone: string;
  delivery: boolean;
  payBank: boolean;
  payCard: boolean;
  setAddress: (address: string) => void;
  setCategoryId: (categoryId: number) => void;
  setDeliveryPrice: (deliveryPrice: number) => void;
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
  categoryId: 0,
  deliveryPrice: 0,
  description: '',
  imageUrl: '',
  name: '',
  phone: '',
  delivery: false,
  payBank: false,
  payCard: false,
  setAddress: (address: string) => set({ address }),
  setCategoryId: (categoryId: number) => set({ categoryId }),
  setDeliveryPrice: (deliveryPrice: number) => set({ deliveryPrice }),
  setDescription: (description: string) => set({ description }),
  setImageUrl: (imageUrl: string) => set({ imageUrl }),
  setName: (name: string) => set({ name }),
  setPhone: (phone: string) => set({ phone }),
  setDelivery: (delivery: boolean) => set({ delivery }),
  setPayBank: (payBank: boolean) => set({ payBank }),
  setPayCard: (payCard: boolean) => set({ payCard }),
}));

export default useShopRegistrationStore;
