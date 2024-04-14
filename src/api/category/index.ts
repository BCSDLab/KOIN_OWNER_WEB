import { accessClient } from 'api';
import { ShopCategory } from 'model/category/shopCategory';

const getShopCategory = async () => {
  const { data } = await accessClient.get<ShopCategory>('/shops/categories');
  return ShopCategory.parse(data);
};

export default getShopCategory;
