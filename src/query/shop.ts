import { useQuery } from '@tanstack/react-query';
import { getMyShopList, getShopInfo, getMenuInfoList } from 'api/shop';

import useUserStore from 'store/user';

const useMyShop = () => {
  const myShopQueryKey = useUserStore.getState().user?.company_number;

  const { data: myShop } = useQuery(['myShop', myShopQueryKey], getMyShopList);

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
