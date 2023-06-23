import { useQuery } from '@tanstack/react-query';
import { getMyShopList, getShopInfo, getMenuInfoList } from 'api/shop';

const useMyShop = () => {
  const { data: myShop } = useQuery(['myShop'], getMyShopList);

  const shopId = myShop?.shops[0].id;

  const { data: shopData } = useQuery(['myShopInfo', shopId], () => getShopInfo({ id: shopId! }), {
    enabled: !!shopId,
  });

  const { data: menuData } = useQuery(['myMenuInfo', shopId], () => getMenuInfoList({ id: shopId! }), {
    enabled: !!shopId,
  });

  return { shopData, menuData };
};

export default useMyShop;
