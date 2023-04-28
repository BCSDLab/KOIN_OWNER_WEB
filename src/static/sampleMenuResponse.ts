export interface MenuSample {
  img: string | null;
  name: string;
  option_price: {
    option: string | null;
    price: number | null;
  }[];
  single_price: number | null;
}

const MENU_SAMPLE: MenuSample[] = [
  {
    img: null,
    name: '족발 + 막국수 저녁 Set',
    option_price: [
      {
        option: '소',
        price: 22000,
      },
      {
        option: '중',
        price: 34000,
      },
      {
        option: '대',
        price: 44000,
      },
    ],
    single_price: null,
  },
];

export default MENU_SAMPLE;
