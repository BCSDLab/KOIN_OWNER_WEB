import useStepStore from 'store/useStepStore';
import useMyShop from 'query/shop';
import cn from 'utils/ts/className';
import { Category as CategoryProps } from 'model/category/shopCategory';
import useShopRegistrationStore from 'store/shopRegistration';
import { useState } from 'react';
import ErrorMessage from 'page/Auth/Signup/component/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import styles from './ShopCategory.module.scss';

export default function ShopCategory() {
  const [isError, setIsError] = useState(false);
  const { categoryList } = useMyShop();
  const { increaseStep } = useStepStore();
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

  const handleNextClick = () => {
    if (category.length === 0) {
      setIsError(true);
    } else {
      setIsError(false);
      increaseStep();
    }
  };

  return (
    <div className={styles.category}>
      <div className={styles.category__title}>카테고리를 골라주세요.</div>
      <div className={styles.category__wrapper}>
        {categoryList?.shop_categories.filter((_, index) => index > 0).map((categoryInfo) => (
          <button
            className={cn({
              [styles.category__menu]: true,
              [styles['category__menu--selected']]: !!category.find((item) => item === categoryInfo.name),
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
      {category.length === 0 && isError && <ErrorMessage message={ERRORMESSAGE.category} />}
      <div className={cn({
        [styles.category__button]: true,
        [styles['category__button--error']]: category.length === 0 && isError,
      })}
      >
        <button type="button" onClick={handleNextClick}>다음</button>
      </div>
    </div>
  );
}
