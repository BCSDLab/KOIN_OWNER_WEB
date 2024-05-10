import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMenu, modifyMenu, deleteMenu } from 'api/shop';
import { NewMenu } from 'model/shopInfo/newMenu';
import useAddMenuStore from 'store/addMenu';
import { shopKeys } from './KeyFactory/shopKeys';

const useMenuInfo = (menuId:number) => {
  const { resetAddMenuStore } = useAddMenuStore();
  const queryClient = useQueryClient();
  const { data: menuData, refetch } = useQuery(
    {
      queryKey: shopKeys.myMenuInfo(menuId),
      queryFn: () => getMenu(menuId),
      refetchOnWindowFocus: true,
    },
  );

  const { mutate: modifyMenuMutation, isError: modifyMenuError } = useMutation({
    mutationFn: (param: NewMenu) => modifyMenu(menuId, param),
    onSuccess: () => {
      resetAddMenuStore();
      queryClient.invalidateQueries();
    },
  });
  return {
    menuData, refetch, modifyMenuMutation, modifyMenuError,
  };
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteMenuMutation } = useMutation({
    mutationFn: (menuId:number) => deleteMenu(menuId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    deleteMenuMutation,
  };
};

export default useMenuInfo;
