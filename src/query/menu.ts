import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMenu, modifyMenu } from 'api/shop';
import { NewMenu } from 'model/shopInfo/newMenu';
import useAddMenuStore from 'store/addMenu';

const useMenuInfo = (menuId:number) => {
  const { resetAddMenuStore } = useAddMenuStore();
  const queryClient = useQueryClient();
  const { data: menuData } = useQuery(
    {
      queryKey: ['menuInfo', menuId],
      queryFn: () => getMenu(menuId),
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
    menuData, modifyMenuMutation, modifyMenuError,
  };
};

export default useMenuInfo;
