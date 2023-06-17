import { useQuery } from '@tanstack/react-query';
import getStoreCategory from 'api/category';

const useStoreCategory = () => {
  const { data: categoryList } = useQuery(['storeCategory'], getStoreCategory);
  return { categoryList };
};

export default useStoreCategory;
