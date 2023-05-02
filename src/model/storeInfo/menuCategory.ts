export interface Menu {
  img: string | null;
  name: string;
  option_price: {
    option: string | null;
    price: number | null;
  }[];
}

export interface MenuCategories {
  id: number;
  name: string;
  menus: Menu[];
}

const MENU_CATEGORYS: MenuCategories[] = [
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
      },
    ],
  },

];

export default MENU_CATEGORYS as MenuCategories[];
