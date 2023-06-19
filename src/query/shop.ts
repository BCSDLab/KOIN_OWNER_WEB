import { useQuery } from '@tanstack/react-query';
import { getMyStore, getMyStoreInfo, getMenuInfo } from 'api/store';

const useMyShop = () => {
  const { data: myStore } = useQuery(['myStore'], getMyStore);

  const shopId = myStore?.shops[0].id;

  const { data: shopData } = useQuery(['myShopInfo', shopId], () => getMyStoreInfo({ id: shopId! }), {
    enabled: !!shopId,
  });

  const { data: menuData } = useQuery(['myMenuInfo', shopId], () => getMenuInfo({ id: shopId! }), {
    enabled: !!shopId,
  });

  return { shopData, menuData };
};

export default useMyShop;
