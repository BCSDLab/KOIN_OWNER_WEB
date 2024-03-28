import { useQuery } from '@tanstack/react-query';
import { getShopList } from 'api/shop';
import { shopKeys } from './KeyFactory/shopKeys';

const useShopList = () => {
  const { data: shopList, isError } = useQuery({
    queryKey: shopKeys.all,
    queryFn: () => getShopList(),
  });
  return { shopList, isError };
};

export default useShopList;
