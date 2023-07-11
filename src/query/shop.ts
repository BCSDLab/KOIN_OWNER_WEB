import { useQuery } from '@tanstack/react-query';
import { getMyShopList, getShopInfo, getMenuInfoList } from 'api/shop';

import useUserStore from 'store/user';

const useMyShop = () => {
  const myShopQueryKey = useUserStore.getState().user?.company_number;

  const { data: myShop } = useQuery(['myShop', myShopQueryKey], getMyShopList);

  const selectedShopId = (idx:number) => {
    if (myShop?.shops.length === 0) return null;
    return myShop?.shops[idx].id;
  }; // shops가 있을때 인자로 가진 인덱스의 가게 id를 리턴

  const shopId = selectedShopId(0);

  const { data: shopData } = useQuery(['myShopInfo', shopId], () => getShopInfo({ id: shopId! }), {
    enabled: !!shopId,
  });

  const { data: menuData } = useQuery(['myMenuInfo', shopId], () => getMenuInfoList({ id: shopId! }), {
    enabled: !!shopId,
  });

  return { shopData, menuData };
};

export default useMyShop;
