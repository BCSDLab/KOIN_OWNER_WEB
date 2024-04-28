import { accessClient } from 'api';
import { CoopResponse, DiningImages, SoldOut } from 'model/Coop';

export const getDining = async () => {
  const { data } = await accessClient.get('/dinings');
  return data;
};

export const uploadDiningImage = async (data: DiningImages) => {
  await accessClient.patch<DiningImages>('/coop/dining/image', data);
};

export const updateSoldOut = async (data: SoldOut) => {
  await accessClient.patch<SoldOut>('/coop/dining/soldout', data);
};

export const getCoopInfo = async () => {
  const { data } = await accessClient.get<CoopResponse>('/user/coop/me');
  return CoopResponse.parse(data);
};
