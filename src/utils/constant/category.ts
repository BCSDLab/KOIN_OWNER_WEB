export interface SubMenu {
  title: string;
  link: string;
  newFlag: boolean;
  planFlag: boolean;
  tag: number | null;
}

export interface Category {
  title: string;
  planFlag: boolean;
  submenu: SubMenu[]
}

export const TOTAL_CATEGORY = 1;

const CATEGORY_OWNER: Category[] = [
  {
    title: '매장관리',
    planFlag: true,
    submenu: [
      {
        title: '가게정보',
        link: '/owner',
        newFlag: true,
        planFlag: true,
        tag: null,
      },
      {
        title: '가게추가',
        link: '/owner/shop-registration',
        newFlag: true,
        planFlag: true,
        tag: null,
      },
      // {
      //   title: '메뉴관리',
      //   link: '/owner/menu-management',
      //   newFlag: true,
      //   planFlag: true,
      //   tag: null,
      // },
      // {
      //   title: '주문관리',
      //   link: '/owner/order-management',
      //   newFlag: true,
      //   planFlag: true,
      //   tag: null,
      // },
      // {
      //   title: '매출관리',
      //   link: '/owner/sales-management',
      //   newFlag: true,
      //   planFlag: true,
      //   tag: null,
      // },
    ],
  },
];

export default CATEGORY_OWNER;
