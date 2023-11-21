import useShopCategory from 'query/shopCategory';
import { useState } from 'react';
import cn from 'utils/ts/className';
import useModalStore from 'store/modalStore';
import styles from './Category.module.scss';

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { categoryList } = useShopCategory();
  const { setCategoryState } = useModalStore();

  return (
    <div className={styles.category}>
      {categoryList?.shop_categories.filter((_, index) => index > 0).map((category) => (
        <button
          className={cn({
            [styles.category__menu]: true,
            [styles['category__menu--selected']]: category.name === selectedCategory,
          })}
          type="button"
          onClick={() => {
            setSelectedCategory(category.name);
            setCategoryState([category.name, category.id]);
          }}
          key={category.id}
        >
          <img className={styles.category__image} src={category.image_url} alt="" />
          <span className={styles.category__type}>{category.name}</span>
        </button>
      ))}
    </div>
  );
}