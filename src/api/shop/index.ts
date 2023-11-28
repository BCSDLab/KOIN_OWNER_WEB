import { MyShopListRes, MyShopInfoRes, MyShopParam } from 'model/shopInfo/myShopInfo';
import { MenuInfoRes } from 'model/shopInfo/menuCategory';
import { ShopListRes } from 'model/shopInfo/allShopInfo';
import { accessClient } from 'api';
import { OwnerShop } from 'model/shopInfo/ownerShop';

export const getMyShopList = async () => {
  const { data } = await accessClient.get<MyShopListRes>('/owner/shops');
  return MyShopListRes.parse(data);
};

export const getShopInfo = async (param: MyShopParam) => {
  const { data } = await accessClient.get<MyShopInfoRes>(`/owner/shops/${param.id}`);
  return MyShopInfoRes.parse(data);
};

export const getMenuInfoList = async (param: MyShopParam) => {
  const { data } = await accessClient.get<MenuInfoRes>(`/owner/shops/${param.id}/menus`);
  return MenuInfoRes.parse(data);
};

export const getShopList = async () => {
  const { data } = await accessClient.get<ShopListRes>('/shops');
  return ShopListRes.parse(data);
};

export const postShop = (data: OwnerShop) => accessClient.post('/owner/shops', data);
