export const menuKeys = {
  all: ['menu'] as const,
  menuInfo: (menuId: number) => [...menuKeys.all, 'menuInfo', menuId] as const,
};
