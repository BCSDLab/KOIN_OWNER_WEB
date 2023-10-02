import useStoreCategory from 'query/storeCategory';
import { useState } from 'react';
import cn from 'utils/ts/className';
import styles from './Category.module.scss';

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { categoryList } = useStoreCategory();
  return (
    <div className={styles.category}>
      {categoryList?.shop_categories.slice(1).map((value) => (
        <button
          className={cn({
            [styles.category__menu]: true,
            [styles['category__menu--selected']]: value.name === selectedCategory,
          })}
          type="button"
          onClick={() => setSelectedCategory(value.name)}
          key={value.id}
        >
          <img className={styles.category__image} src={value.image_url} alt="category_img" />
          <span className={styles.category__type}>{value.name}</span>
        </button>
      ))}
    </div>
  );
}
