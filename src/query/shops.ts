import { useQuery } from '@tanstack/react-query';
import { getAllShopList } from 'api/shop';

const useAllShops = () => {
  const { data: shopList, isError } = useQuery(['allshops'], getAllShopList);
  return { shopList, isError };
};

export default useAllShops;
