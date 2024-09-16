import ROUTES from 'static/routes';

export interface SubMenu {
  title: string;
  link: string;
  newFlag: boolean;
  planFlag: boolean;
  tag: number | null;
}

export interface HeaderCategory {
  title: string;
  planFlag: boolean;
  submenu: SubMenu[]
}

export const TOTAL_CATEGORY = 1;

export const CATEGORY_OWNER: HeaderCategory[] = [
  {
    title: '매장관리',
    planFlag: true,
    submenu: [
      {
        title: '가게정보',
        link: ROUTES.Owner(),
        newFlag: true,
        planFlag: true,
        tag: null,
      },
      {
        title: '가게추가',
        link: ROUTES.OwnerShopRegistration(),
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
