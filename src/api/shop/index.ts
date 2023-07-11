import { MyShopList, MyShopInfoRes, MyShopParam } from 'model/shopInfo/myShopInfo';
import { MenuInfoRes } from 'model/shopInfo/menuCategory';
import { accessClient } from 'api';

export const getMyShopList = async () => {
  const { data } = await accessClient.get<MyShopList>('/owner/shops');
  return MyShopList.parse(data);
};

export const getShopInfo = async (param: MyShopParam) => {
  const { data } = await accessClient.get<MyShopInfoRes>(`/owner/shops/${param.id}`);
  return MyShopInfoRes.parse(data);
};

export const getMenuInfoList = async (param: MyShopParam) => {
  const { data } = await accessClient.get<MenuInfoRes>(`/owner/shops/${param.id}/menus`);
  return MenuInfoRes.parse(data);
};
