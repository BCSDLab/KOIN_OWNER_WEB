import { useQuery } from '@tanstack/react-query';
import { getMyShop, getMyShopInfo, getMenuInfo } from 'api/shop';

const useMyShop = () => {
  const { data: myShop } = useQuery(['myShop'], getMyShop);

  const shopId = myShop?.shops[0].id;

  const { data: shopData } = useQuery(['myShopInfo', shopId], () => getMyShopInfo({ id: shopId! }), {
    enabled: !!shopId,
  });

  const { data: menuData } = useQuery(['myMenuInfo', shopId], () => getMenuInfo({ id: shopId! }), {
    enabled: !!shopId,
  });

  return { shopData, menuData };
};

export default useMyShop;
