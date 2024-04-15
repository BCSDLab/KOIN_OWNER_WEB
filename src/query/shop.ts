import {
  useMutation, useQuery, useQueryClient, useSuspenseQuery,
} from '@tanstack/react-query';
import {
  getMyShopList, getShopInfo, getMenuInfoList, addMenu,
} from 'api/shop';
import useUserStore from 'store/user';
import useAddMenuStore from 'store/addMenu';
import { NewMenu } from 'model/shopInfo/newMenu';

const useMyShop = () => {
  const myShopQueryKey = useUserStore.getState().user?.company_number;
  const queryClient = useQueryClient();
  const { resetAddMenuStore } = useAddMenuStore();
  const { data: myShop } = useSuspenseQuery({
    queryKey: ['myShop', myShopQueryKey],
    queryFn: () => getMyShopList(),
  });

  const prevShopId = Number(localStorage.getItem('myShopId'));
  const prevShop = prevShopId ? myShop.shops.find((shop) => shop.id === prevShopId) : null;

  const currentMyShopId = prevShop ? prevShop.id : myShop.shops[0]?.id;

  const shopId = currentMyShopId;

  const { data: shopData, refetch: refetchShopData, isLoading } = useQuery({
    queryKey: ['myShopInfo', shopId],
    queryFn: () => getShopInfo({ id: shopId }),
    enabled: !!shopId,
  });

  const { data: menusData } = useQuery({
    queryKey: ['myMenuInfo', shopId],
    queryFn: () => getMenuInfoList({ id: shopId }),
    enabled: !!shopId,
  });

  const { mutate: addMenuMutation, isError: addMenuError } = useMutation({
    mutationFn: (param: NewMenu) => {
      if (typeof shopId === 'number') {
        return addMenu(shopId, param);
      }
      throw new Error('Invalid shopId');
    },
    onSuccess: () => {
      resetAddMenuStore();
      queryClient.invalidateQueries({ queryKey: ['myMenuInfo', shopId] });
    },
  });

  return {
    shopData, menusData, addMenuMutation, addMenuError, refetchShopData, isLoading, myShop,
  };
};

export default useMyShop;
