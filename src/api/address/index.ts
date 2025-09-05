import { accessClient } from 'api';
import { Address, type AddressParams } from 'model/shopInfo/address';

export const getAddress = async (params:AddressParams) => {
  const { data } = await accessClient.get<Address>('/address/search', { params });
  return Address.parse(data);
};
