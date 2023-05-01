export interface OpenInfo {
  close_time: string;
  closed: boolean;
  day_of_week: string;
  open_time: string;
}

export interface MyStoreInfo {
  address: string;
  delivery: boolean;
  deliveryPrice: number;
  description: string;
  id: number;
  name: string;
  open: OpenInfo[],
  pay_bank: boolean;
  pay_card: boolean;
  phone: string;
}

const MY_STORE_INFO: MyStoreInfo = {
  address: '천안시 동남구 충절로 880 가동 1층',
  delivery: true,
  deliveryPrice: 0,
  description: '3대째 다져온 고집스러운 맛',
  id: 1,
  name: '가장 맛있는 족발',
  open: [
    {
      close_time: '00:00',
      closed: false,
      day_of_week: '매주 화요일',
      open_time: '16:00',
    },
  ],
  pay_bank: true,
  pay_card: true,
  phone: '041-523-5849',
};

export default MY_STORE_INFO;
