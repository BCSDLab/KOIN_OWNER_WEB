import { useState } from 'react';
import { getAddress } from 'api/address';

export default function useAddress() {
  const [address, setAddress] = useState('');

  const changeAddress = (keyword: string) => setAddress(keyword);

  const search = async () => {
    if (!address.trim()) return null;

    return getAddress({
      keyword: address,
      currentPage: '1',
      countPerPage: '10',
    });
  };

  return {
    address,
    changeAddress,
    search,
  };
}
