import useStepStore from 'store/useStepStore';
import useShopCategory from 'query/shopCategory';
import cn from 'utils/ts/className';
import { Category as CategoryProps } from 'model/category/storeCategory';
import useShopRegistrationStore from 'store/shopRegistration';
import styles from './ShopCategory.module.scss';

export default function ShopCategory() {
  const { categoryList } = useShopCategory();
  const { increaseStep } = useStepStore();
  const {
    category, setCategory, setCategoryId,
  } = useShopRegistrationStore();

  const handleCategoryClick = (categoryInfo: CategoryProps) => {
    setCategory(categoryInfo.name);
    setCategoryId(categoryInfo.id);
  };

  return (
    <div className={styles.category}>
      <div className={styles.category__title}>카테고리를 골라주세요.</div>
      <div className={styles.category__wrapper}>
        {categoryList?.shop_categories.filter((_, index) => index > 0).map((categoryInfo) => (
          <button
            className={cn({
              [styles.category__menu]: true,
              [styles['category__menu--selected']]: categoryInfo.name === category,
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
      <div className={styles.category__button}>
        <button type="button" onClick={increaseStep}>다음</button>
      </div>
    </div>
  );
}
