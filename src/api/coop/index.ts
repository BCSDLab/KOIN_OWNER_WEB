import { accessClient } from 'api';
import { DiningImages, SoldOut } from 'model/Coop';

export const getDining = async (date: string) => {
  const { data } = await accessClient.get(`/dinings?date=${date}`);
  return data;
};

export const uploadDiningImage = async (data: DiningImages) => {
  await accessClient.patch<DiningImages>('/coop/dining/image', data);
};

export const updateSoldOut = async (data: SoldOut) => {
  await accessClient.patch<SoldOut>('/coop/dining/soldout', data);
};
