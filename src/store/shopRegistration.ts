import { create } from 'zustand';

interface ShopRegistrationStore {
  address: string;
  category: string;
  categoryId: number;
  deliveryPrice: number | string;
  description: string;
  imageUrl: string;
  owner: string;
  name: string;
  phone: string;
  delivery: boolean;
  payBank: boolean;
  payCard: boolean;
  shopId:string;
  setAddress: (address: string) => void;
  setCategory: (category: string) => void;
  setCategoryId: (categoryId: number) => void;
  setDeliveryPrice: (deliveryPrice: number | string) => void;
  setDescription: (description: string) => void;
  setImageUrl: (imageUrl: string) => void;
  setOwner: (owner: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setDelivery: (delivery: boolean) => void;
  setPayBank: (payBank: boolean) => void;
  setPayCard: (payCard: boolean) => void;
  setShopId: (shopId:string) => void
}

const useShopRegistrationStore = create<ShopRegistrationStore>((set) => ({
  address: '',
  category: '',
  categoryId: 0,
  deliveryPrice: '',
  description: '',
  imageUrl: '',
  owner: '',
  name: '',
  phone: '',
  delivery: false,
  payBank: false,
  payCard: false,
  shopId: '',
  setAddress: (address: string) => set({ address }),
  setCategory: (category: string) => set({ category }),
  setCategoryId: (categoryId: number) => set({ categoryId }),
  setDeliveryPrice: (deliveryPrice: number | string) => set({ deliveryPrice }),
  setDescription: (description: string) => set({ description }),
  setImageUrl: (imageUrl: string) => set({ imageUrl }),
  setOwner: (owner: string) => set({ owner }),
  setName: (name: string) => set({ name }),
  setPhone: (phone: string) => set({ phone }),
  setDelivery: (delivery: boolean) => set({ delivery }),
  setPayBank: (payBank: boolean) => set({ payBank }),
  setPayCard: (payCard: boolean) => set({ payCard }),
  setShopId: (shopId:string) => set({ shopId }),
}));

export default useShopRegistrationStore;
