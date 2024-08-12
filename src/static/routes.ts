const ROUTES = {
  Main: '/',
  Owner: '/owner',
  OwnerShopRegistration: '/owner/shop-registration',
  OwnerAddMenu: '/owner/add-menu',
  OwnerModifyMenu: {
    path: '/owner/modify-menu/:id',
    general: (id: number) => `/owner/modify-menu/${id}`,
  },
  OwnerModifyInfo: '/owner/modify-info',
  OwnerMenuManagement: '/owner/menu-management',
  OwnerOrderManagement: '/owner/order-management',
  OwnerSalesmanagement: '/owner/sales-management',
  OwnerEvent: {
    path: '/owner/event-add/:id',
    general: (id:number) => `/owner/event-add/${id}`,
  },
  OwnerEventModify: {
    path: '/owner/event-modify/:id',
    general: (id: number) => `/owner/event-modify/${id}`,
  },
  Login: '/login',
  Signup: '/signup',
  FindPW: '/find-password',
  FindId: '/find-id',
};

export default ROUTES;
