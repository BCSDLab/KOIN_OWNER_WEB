import useMyShop from 'query/shop';
import cn from 'utils/ts/className';
import { Category as CategoryProps } from 'model/category/shopCategory';
import { useFormContext, useWatch } from 'react-hook-form';
import styles from './Category.module.scss';

export default function Category() {
  const { categoryList } = useMyShop();
  const { control, setValue } = useFormContext();
  const categoryId = useWatch({ control, name: 'category_ids' });

  const handleCategoryClick = (categoryInfo: CategoryProps) => {
    setValue('category_ids', [categoryInfo.id, 0]);
    setValue('main_category_id', categoryInfo.id);
  };

  return (
    <div className={styles.category}>
      {categoryList?.shop_categories.filter((_, index) => index > 0).map((categoryInfo) => (
        <button
          className={cn({
            [styles.category__menu]: true,
            [styles['category__menu--selected']]: categoryId[0] === categoryInfo.id,
          })}
          type="button"
          onClick={() => handleCategoryClick(categoryInfo)}
          key={categoryInfo.id}
        >
          <img
            className={styles.category__image}
            src={categoryInfo.image_url}
            alt={categoryInfo.name}
          />
          <span className={styles.category__type}>{categoryInfo.name}</span>
        </button>
      ))}
    </div>
  );
}
