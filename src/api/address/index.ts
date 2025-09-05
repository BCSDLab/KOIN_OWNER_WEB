import { accessClient } from 'api';
import { AddressSearchResponse, type AddressParams } from 'model/shopInfo/address';

export const getAddress = async (params:AddressParams) => {
  const { data } = await accessClient.get<AddressSearchResponse>('/address/search', { params });
  return AddressSearchResponse.parse(data);
};
