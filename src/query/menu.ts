import { useQuery, useMutation } from '@tanstack/react-query';
import { getMenu, modifyMenu } from 'api/shop';
import { Menu } from 'model/shopInfo/menuCategory';
import useAddMenuStore from 'store/addMenu';

const useMenuInfo = (menuId:number) => {
  const { resetAddMenuStore } = useAddMenuStore();
  const { data: menuData } = useQuery(
    {
      queryKey: ['menuInfo', menuId],
      queryFn: () => getMenu(menuId),
      enabled: !!menuId,
    },
  );
  const { mutate: modifyMenuMutation, isError: modifyMenuError } = useMutation({
    mutationFn: (param: Menu) => modifyMenu(menuId, param),
    onSuccess: () => {
      resetAddMenuStore();
    },
  });
  return {
    menuData, modifyMenuMutation, modifyMenuError,
  };
};

export default useMenuInfo;
