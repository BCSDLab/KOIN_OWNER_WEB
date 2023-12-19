import { accessClient } from 'api';
import { StoreCategory } from 'model/category/storeCategory';

const getShopCategory = async () => {
  const { data } = await accessClient.get<StoreCategory>('/shops/categories');
  return StoreCategory.parse(data);
};

export default getShopCategory;
