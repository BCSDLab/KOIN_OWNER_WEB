import { useQuery } from '@tanstack/react-query';
import getShopCategory from 'api/category';
import { shopCategoryKeys } from './KeyFactory/shopCategoryKeys';

const useShopCategory = () => {
  const { data: categoryList } = useQuery({
    queryKey: shopCategoryKeys.shopCategory,
    queryFn: () => getShopCategory(),
  });
  return { categoryList };
};

export default useShopCategory;
