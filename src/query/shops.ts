import { useQuery } from '@tanstack/react-query';
import { getShopList } from 'api/shop';

const useShopList = () => {
  const { data: shopList, isError } = useQuery({
    queryKey: ['allshops'],
    queryFn: () => getShopList,
  });
  return { shopList, isError };
};

export default useShopList;
