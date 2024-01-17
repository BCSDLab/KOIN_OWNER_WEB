import { MyShopListRes, MyShopInfoRes, MyShopParam } from 'model/shopInfo/myShopInfo';
import { MenuInfoRes } from 'model/shopInfo/menuCategory';
import { ShopListRes } from 'model/shopInfo/allShopInfo';
import { accessClient, client } from 'api';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { NewMenu } from 'model/shopInfo/newMenu';

export const getMyShopList = async () => {
  const { data } = await accessClient.get<MyShopListRes>('/owner/shops');
  return MyShopListRes.parse(data);
};

export const getShopInfo = async (param: MyShopParam) => {
  const { data } = await accessClient.get<MyShopInfoRes>(`/owner/shops/${param.id}`);
  return MyShopInfoRes.parse(data);
};

export const getMenuInfoList = async (param: MyShopParam) => {
  const { data } = await accessClient.get<MenuInfoRes>(`/owner/shops/menus?shopId=${param.id}`);
  return MenuInfoRes.parse(data);
};

export const getShopList = async () => {
  const { data } = await client.get<ShopListRes>('/shops');
  return ShopListRes.parse(data);
};

export const addMenu = (shopId:number, param: NewMenu) => accessClient.post(`/owner/shops/${shopId}/menus`, param);

export const postShop = (data: OwnerShop) => accessClient.post('/owner/shops', data);
