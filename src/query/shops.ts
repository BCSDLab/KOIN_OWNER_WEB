import { useQuery } from '@tanstack/react-query';
import { getAllShopList } from 'api/shop';

const useAllShops = () => {
  const { data: shopList } = useQuery(['allshops'], getAllShopList);
  return { shopList };
};

export default useAllShops;
