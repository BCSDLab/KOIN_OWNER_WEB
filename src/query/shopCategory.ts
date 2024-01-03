import { useQuery } from '@tanstack/react-query';
import getShopCategory from 'api/category';

const useShopCategory = () => {
  const { data: categoryList } = useQuery({
    queryKey: ['shopCategory'],
    queryFn: () => getShopCategory(),
  });
  return { categoryList };
};

export default useShopCategory;
