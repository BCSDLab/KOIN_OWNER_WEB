export const shopKeys = {
  all: ['shop'] as const,
  myShopList: (myShopQueryKey: string | undefined) => [...shopKeys.all, 'myShop', myShopQueryKey] as const,
  myShopInfo: (shopId: number) => [...shopKeys.all, 'myShopInfo', shopId] as const,
  myMenuInfo: (shopId: number) => [...shopKeys.all, 'myMenuInfo', shopId] as const,
};
