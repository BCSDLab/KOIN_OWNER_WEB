type ROUTESParams<T extends string = string> = {
  [key in T]?: string;
} & {
  /**
   * 경로가 네비게이션(ex. `Link`, `navigate`)에 사용되는지 여부를 나타냅니다.
   * - `true`일 경우, `Link`나 `navigate`를 사용할 때 동적 링크 생성을 의미합니다.
   * - `false`일 경우, `App.tsx`에서 경로를 정의할 때 사용됩니다.
   */
  isLink: boolean;
};

const ROUTES = {
  Main: () => '/',
  Owner: {
    Root: () => '/owner',
    ShopRegistration: () => '/owner/shop-registration',
    AddMenu: () => '/owner/add-menu',
    EditMenu: () => '/owner/edit-menu',
    ModifyMenu: ({ id, isLink }: ROUTESParams<'id'>) => (isLink ? `/owner/modify-menu/${id}` : '/owner/modify-menu/:id'),
    ModifyInfo: () => '/owner/modify-info',
    MenuManagement: () => '/owner/menu-management',
    OrderManagement: () => '/owner/order-management',
    SalesManagement: () => '/owner/sales-management',
    Event: ({ id, isLink }: ROUTESParams<'id'>) => (isLink ? `/owner/event-add/${id}` : '/owner/event-add/:id'),
    EventModify: ({ id, isLink }: ROUTESParams<'id'>) => (isLink ? `/owner/event-modify/${id}` : '/owner/event-modify/:id'),
  },
  Login: () => '/login',
  Signup: () => '/signup',
  FindPW: () => '/find-password',
  FindId: () => '/find-id',
};

export default ROUTES;
