import useMyShop from 'query/shop';
import cn from 'utils/ts/className';
import { Category as CategoryProps } from 'model/category/shopCategory';
import useShopRegistrationStore from 'store/shopRegistration';
import styles from './Category.module.scss';

export default function Category() {
  const { categoryList } = useMyShop();
  const {
    category, categoryId, setCategory, setCategoryId,
  } = useShopRegistrationStore();

  const handleCategoryClick = (categoryInfo: CategoryProps) => {
    const findPrevCategory = categoryId.find((id) => id === categoryInfo.id);
    if (findPrevCategory) {
      const deleteCategoryId = categoryId.filter(
        (item) => item !== findPrevCategory,
      ); // 삭제 후 카테고리 id
      const deleteCategory = category.filter((item) => item !== categoryInfo.name); // 삭제 후 카테고리 이름
      setCategoryId(deleteCategoryId);
      setCategory(deleteCategory);
    } else {
      setCategoryId([...categoryId, categoryInfo.id]); // 추가 후 카테고리 id
      setCategory([...category, categoryInfo.name]); // 추가 후 카테고리 이름
    }
  };

  return (
    <div className={styles.category}>
      {categoryList?.shop_categories.filter((_, index) => index > 0).map((categoryInfo) => (
        <button
          className={cn({
            [styles.category__menu]: true,
            [styles['category__menu--selected']]: !!category.find((item) => item === categoryInfo.name),
          })}
          type="button"
          onClick={() => { handleCategoryClick(categoryInfo); }}
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
