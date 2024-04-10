import { MyShopListRes, MyShopInfoRes, MyShopParam } from 'model/shopInfo/myShopInfo';
import { MonoMenu, MenuInfoRes } from 'model/shopInfo/menuCategory';
import { ShopListRes } from 'model/shopInfo/allShopInfo';
import { accessClient, client } from 'api';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { NewMenu } from 'model/shopInfo/newMenu';
import { EventInfo } from 'model/shopInfo/event';

export const getMyShopList = async () => {
  const { data } = await accessClient.get<MyShopListRes>('/owner/shops');
  return MyShopListRes.parse(data);
};

export const getShopInfo = async (param: MyShopParam) => {
  const { data } = await accessClient.get<MyShopInfoRes>(`/owner/shops/${param.id || ''}`);
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

export const getMenu = async (menuId: number) => {
  const { data } = await accessClient.get(`/owner/shops/menus/${menuId}`);
  return MonoMenu.parse(data);
};

export const modifyMenu = (menuId:number, param:NewMenu) => accessClient.put(`/owner/shops/menus/${menuId}`, param);

export const putShop = (id: number, data: OwnerShop) => accessClient.put(`/owner/shops/${id}`, data);

export const deleteMenu = (menuId:number) => accessClient.delete(`/owner/shops/menus/${menuId}`);

export const addEvent = (id: number, eventInfo: EventInfo) => accessClient.post(`owner/shops/${id}/event`, eventInfo);
