import { useQuery } from '@tanstack/react-query';
import getShopCategory from 'api/category';

const useShopCategory = () => {
  const { data: categoryList } = useQuery(['shopCategory'], getShopCategory);
  return { categoryList };
};

export default useShopCategory;
