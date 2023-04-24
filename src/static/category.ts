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

const CATEGORY: Category[] = [
  {
    title: '매장관리',
    planFlag: true,
    submenu: [
      {
        title: '가게정보',
        link: '/store-info',
        newFlag: true,
        planFlag: true,
        tag: null,
      },
      {
        title: '메뉴관리',
        link: '/menu-management',
        newFlag: true,
        planFlag: true,
        tag: null,
      },
      {
        title: '주문관리',
        link: '/order-management',
        newFlag: true,
        planFlag: true,
        tag: null,
      },
      {
        title: '매출관리',
        link: '/sales-management',
        newFlag: true,
        planFlag: true,
        tag: null,
      },
      {
        title: '가게추가',
        link: '/store-add',
        newFlag: true,
        planFlag: true,
        tag: null,
      },

    ],
  },
];

export default CATEGORY;
