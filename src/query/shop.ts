import { useQuery } from '@tanstack/react-query';
import { getMyShopList, getShopInfo, getMenuInfoList } from 'api/shop';

// 스토어에 저장되어이쓴 정보를 가져온다.
import useUserStore from 'store/user';

const useMyShop = () => {
  const userQueryKey = useUserStore.getState().user?.company_number;

  const { data: myShop } = useQuery(['myShop', userQueryKey], getMyShopList);

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
