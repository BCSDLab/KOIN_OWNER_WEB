import {
  useMutation, useQuery, useQueryClient, useSuspenseQuery,
} from '@tanstack/react-query';
import {
  getMyShopList, getShopInfo, getMenuInfoList, addMenu, getStoreEventList,
} from 'api/shop';
import useUserStore from 'store/user';
import useAddMenuStore from 'store/addMenu';
import { NewMenu } from 'model/shopInfo/newMenu';
import getShopCategory from 'api/category';
import { shopKeys } from './KeyFactory/shopKeys';

const useMyShop = () => {
  const myShopQueryKey = useUserStore.getState().user?.company_number;
  const queryClient = useQueryClient();
  const { resetAddMenuStore } = useAddMenuStore();
  const { data: myShop } = useSuspenseQuery({
    queryKey: shopKeys.myShopList(myShopQueryKey),
    queryFn: () => getMyShopList(),
  });

  const shopId = myShop.shops[0]?.id;

  const { data: shopData, refetch: refetchShopData, isLoading } = useQuery({
    queryKey: shopKeys.myShopInfo(shopId),
    queryFn: () => getShopInfo({ id: shopId }),
    enabled: !!shopId,
  });

  const { data: menusData } = useQuery({
    queryKey: shopKeys.myMenuInfo(shopId),
    queryFn: () => getMenuInfoList({ id: shopId }),
    enabled: !!shopId,
  });

  const { data: categoryList } = useQuery({
    queryKey: shopKeys.shopCategoryInfo,
    queryFn: () => getShopCategory(),
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
      queryClient.invalidateQueries({ queryKey: shopKeys.myMenuInfo(shopId) });
    },
  });

  const { data: evnetList } = useQuery({
    queryKey: shopKeys.eventList(shopId),
    queryFn: () => getStoreEventList({ id: shopId }),
  });
  return {
    shopData,
    menusData,
    addMenuMutation,
    addMenuError,
    refetchShopData,
    isLoading,
    categoryList,
    evnetList,
  };
};

export default useMyShop;
