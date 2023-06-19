import { MyShopList, MyStoreInfoRes, MyStoreParam } from 'model/storeInfo/myStoreInfo';
import { MenuInfoRes } from 'model/storeInfo/menuCategory';
import { accessClient } from 'api';

export const getMyStore = async () => {
  const { data } = await accessClient.get<MyShopList>('/owner/shops');
  return MyShopList.parse(data);
};

export const getMyStoreInfo = async (param: MyStoreParam) => {
  const { data } = await accessClient.get<MyStoreInfoRes>(`/owner/shops/${param.id}`);
  return MyStoreInfoRes.parse(data);
};

export const getMenuInfo = async (param: MyStoreParam) => {
  const { data } = await accessClient.get<MenuInfoRes>(`/owner/shops/${param.id}/menus`);
  return MenuInfoRes.parse(data);
};
