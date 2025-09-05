import { useQuery } from '@tanstack/react-query';
import { getAddress } from 'api/address';
import { Address } from 'model/shopInfo/address';
import { addressKeys } from './KeyFactory/addressKeys';

const useAddress = (keyword: string) => {
  const { data: addressData } = useQuery<Address>({
    queryKey: addressKeys.search(keyword),
    queryFn: () => getAddress({ keyword, currentPage: '1', countPerPage: '10' }),
    enabled: keyword.length > 0,
  });

  return { addressData };
};

export default useAddress;
