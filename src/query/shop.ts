import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getMyShopList, getShopInfo, getMenuInfoList, addMenu,
} from 'api/shop';
import useUserStore from 'store/user';
import { NewMenu } from 'model/shopInfo/newMenu';

const useMyShop = () => {
  const myShopQueryKey = useUserStore.getState().user?.company_number;

  const { data: myShop } = useQuery({
    queryKey: ['myShop', myShopQueryKey],
    queryFn: () => getMyShopList(),
  });

  const selectedShopId = (idx:number) => {
    if (myShop?.shops.length === 0) return null;
    return myShop?.shops[idx].id;
  }; // shops가 있을때 인자로 가진 인덱스의 가게 id를 리턴

  const shopId = selectedShopId(0);

  const { data: shopData } = useQuery({
    queryKey: ['myShopInfo', shopId],
    queryFn: () => getShopInfo({ id: shopId! }),
    enabled: !!shopId,
  });

  const { data: menuData } = useQuery({
    queryKey: ['myMenuInfo', shopId],
    queryFn: () => getMenuInfoList({ id: shopId! }),
    enabled: !!shopId,
  });

  const { mutate: addMenuMutation, isError: addMenuError } = useMutation({
    mutationFn: (param: NewMenu) => {
      if (typeof shopId === 'number') {
        return addMenu(shopId, param);
      }
      throw new Error('Invalid shopId');
    },
  });

  return {
    shopData, menuData, addMenuMutation, addMenuError,
  };
};

export default useMyShop;
