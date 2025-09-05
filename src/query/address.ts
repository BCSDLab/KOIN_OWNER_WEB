import { useState } from 'react';
import { getAddress } from 'api/address';
import type { AddressSearchResponse } from 'model/shopInfo/address';

export default function useAddress() {
  const [address, setAddress] = useState('');
  const [addressData, setAddressData] = useState<AddressSearchResponse | undefined>(undefined);

  const changeAddress = (keyword: string) => setAddress(keyword);

  const search = async () => {
    if (!address.trim()) return;
    const data = await getAddress({
      keyword: address,
      currentPage: '1',
      countPerPage: '10',
    });
    setAddressData(data);
  };

  return {
    address,
    changeAddress,
    search,
    addressData,
  };
}
