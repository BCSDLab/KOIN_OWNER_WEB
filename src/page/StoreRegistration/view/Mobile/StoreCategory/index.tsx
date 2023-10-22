import { useState } from 'react';
import useStepStore from 'store/useStepStore';
import useStoreCategory from 'query/storeCategory';
import cn from 'utils/ts/className';
import styles from './StoreCategory.module.scss';

type Category = string;

export default function StoreCategory() {
  const { categoryList } = useStoreCategory();
  const { increaseStep } = useStepStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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
            onClick={() => setSelectedCategory(category.name)}
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
