import {
  useMutation, useQuery, useQueryClient, useSuspenseQuery,
} from '@tanstack/react-query';
import {
  getMyShopList, getShopInfo, getMenuInfoList, addMenu, getShopEventList,
} from 'api/shop';
import { isKoinError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import useAddMenuStore from 'store/addMenu';
import { NewMenu } from 'model/shopInfo/newMenu';
import { useNavigate } from 'react-router-dom';
import getShopCategory from 'api/category';
import useSuspenseUser from 'utils/hooks/useSuspenseUser';
import ROUTES from 'static/routes';
import { shopKeys } from './KeyFactory/shopKeys';

const useMyShop = () => {
  let myShopQueryKey = '';
  const navigate = useNavigate();
  const { data: user } = useSuspenseUser();
  if (user && 'company_number' in user) {
    myShopQueryKey = user.company_number;
  }
  const queryClient = useQueryClient();
  const { resetAddMenuStore } = useAddMenuStore();
  const { data: myShop } = useSuspenseQuery({
    queryKey: shopKeys.myShopList(myShopQueryKey),
    queryFn: () => getMyShopList(),
  });

  const prevShopId = Number(localStorage.getItem('myShopId'));
  const prevShop = prevShopId ? myShop.shops.find((shop) => shop.id === prevShopId) : null;

  const currentMyShopId = prevShop ? prevShop.id : myShop.shops[0]?.id;

  const shopId = currentMyShopId;

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
      navigate(ROUTES.Owner());
    },
    onError: (e) => {
      if (isKoinError(e)) {
        showToast('error', e.message);
      }
    },
  });

  const { data: eventList } = useQuery({
    queryKey: shopKeys.eventList(shopId),
    queryFn: () => getShopEventList({ id: shopId }),
  });

  return {
    shopData,
    menusData,
    addMenuMutation,
    addMenuError,
    refetchShopData,
    isLoading,
    categoryList,
    eventList,
    myShop,
  };
};

export default useMyShop;
