import useShopCategory from 'query/shopCategory';
import cn from 'utils/ts/className';
import { Category as CategoryProps } from 'model/category/storeCategory';
import useShopRegistrationStore from 'store/shopRegistration';
import styles from './Category.module.scss';

export default function Category() {
  const { categoryList } = useShopCategory();
  const { category, setCategory, setCategoryId } = useShopRegistrationStore();

  const handleCategoryClick = (categoryInfo: CategoryProps) => {
    setCategory(categoryInfo.name);
    setCategoryId(categoryInfo.id);
  };

  return (
    <div className={styles.category}>
      {categoryList?.shop_categories.filter((_, index) => index > 0).map((categoryInfo) => (
        <button
          className={cn({
            [styles.category__menu]: true,
            [styles['category__menu--selected']]: categoryInfo.name === category,
          })}
          type="button"
          onClick={() => { handleCategoryClick(categoryInfo); }}
          key={categoryInfo.id}
        >
          <img className={styles.category__image} src={categoryInfo.image_url} alt="" />
          <span className={styles.category__type}>{categoryInfo.name}</span>
        </button>
      ))}
    </div>
  );
}
