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
  Owner: () => '/owner',
  OwnerShopRegistration: () => '/owner/shop-registration',
  OwnerAddMenu: () => '/owner/add-menu',
  OwnerModifyMenu: ({ id, isLink }: ROUTESParams<'id'>) => (isLink ? `/owner/modify-menu/${id}` : '/owner/modify-menu/:id'),
  OwnerModifyInfo: () => '/owner/modify-info',
  OwnerMenuManagement: () => '/owner/menu-management',
  OwnerOrderManagement: () => '/owner/order-management',
  OwnerSalesmanagement: () => '/owner/sales-management',
  OwnerEvent: ({ id, isLink }: ROUTESParams<'id'>) => (isLink ? `/owner/event-add/${id}` : '/owner/event-add/:id'),
  OwnerEventModify: ({ id, isLink }: ROUTESParams<'id'>) => (isLink ? `/owner/event-modify/${id}` : '/owner/event-modify/:id'),
  Login: () => '/login',
  Signup: () => '/signup',
  FindPW: () => '/find-password',
  FindId: () => '/find-id',
};

export default ROUTES;
