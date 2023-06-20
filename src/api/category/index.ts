import { accessClient } from 'api';
import { StoreCategory } from 'model/category/storeCategory';

const getStoreCategory = async () => {
  const { data } = await accessClient.get<StoreCategory>('/shops/categories');
  return StoreCategory.parse(data);
};

export default getStoreCategory;
