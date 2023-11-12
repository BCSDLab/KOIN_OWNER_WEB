import { MyShopList, MyShopInfoRes, MyShopParam } from 'model/shopInfo/myShopInfo';
import { MenuInfoRes } from 'model/shopInfo/menuCategory';
import { AllShopList } from 'model/shopInfo/allShopInfo';
import { accessClient } from 'api';
import { OwnerShop } from 'model/shopInfo/ownerShop';

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

export const getAllShopList = async () => {
  const { data } = await accessClient.get<AllShopList>('/shops');
  return AllShopList.parse(data);
};

export const postRegisterShop = (data: OwnerShop) => accessClient.post('/owner/shops', data);
