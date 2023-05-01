export interface MenuSample {
  img: string | null;
  name: string;
  option_price: {
    option: string | null;
    price: number | null;
  }[];
  single_price: number | null;
}

export interface Menu {
  id: number;
  name: string;
  menus: MenuSample[];
}

const MENU_CATEGORYS: Menu[] = [
  {
    id: 1,
    name: '이벤트 메뉴',
    menus: [
      {
        img: null,
        name: '족발 + 막국수 이벤트 Set',
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
    ],
  },
  {
    id: 2,
    name: '대표 메뉴',
    menus: [
      {
        img: null,
        name: '족발 + 막국수 대표 Set',
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
    ],
  },

];
// export default MENU_CATEGORY;
export default MENU_CATEGORYS as Menu[];
