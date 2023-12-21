import { useState } from 'react';
import useStepStore from 'store/useStepStore';
import useShopCategory from 'query/shopCategory';
import cn from 'utils/ts/className';
import { Category as CategoryProps } from 'model/category/storeCategory';
import useModalStore from 'store/modalStore';
import styles from './ShopCategory.module.scss';

type Category = string;

export default function ShopCategory() {
  const { categoryList } = useShopCategory();
  const { increaseStep } = useStepStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { setCategoryState } = useModalStore();

  const handleCategoryClick = (category: CategoryProps) => {
    setSelectedCategory(category.name);
    setCategoryState([category.name, category.id]);
  };

  return (
    <div className={styles.category}>
      <div className={styles.category__title}>카테고리를 골라주세요.</div>
      <div className={styles.category__wrapper}>
        {categoryList?.shop_categories.filter((_, index) => index > 0).map((category) => (
          <button
            className={cn({
              [styles.category__menu]: true,
              [styles['category__menu--selected']]: category.name === selectedCategory,
            })}
            type="button"
            onClick={() => handleCategoryClick(category)}
            key={category.id}
          >
            <img className={styles.category__image} src={category.image_url} alt="" />
            <span className={styles.category__type}>{category.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.category__button}>
        <button type="button" onClick={increaseStep}>다음</button>
      </div>
    </div>
  );
}
