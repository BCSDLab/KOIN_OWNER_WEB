import useMyShop from 'query/shop';
import cn from 'utils/ts/className';
import { Category as CategoryProps } from 'model/category/shopCategory';
import { useState } from 'react';
import ErrorMessage from 'component/common/ErrorMessage';
import { ERRORMESSAGE } from 'page/ShopRegistration/constant/errorMessage';
import { useFormContext, useWatch } from 'react-hook-form';
import styles from './ShopCategory.module.scss';

export default function ShopCategory({ onNext, onPrev }:{
  onNext: () => void, onPrev: () => void
}) {
  const [isError, setIsError] = useState(false);
  const { categoryList } = useMyShop();
  const { control, setValue } = useFormContext();
  const categoryId = useWatch({ control, name: 'category_ids', defaultValue: [] });

  const handleCategoryClick = (categoryInfo: CategoryProps) => {
    setValue('category_ids', [categoryInfo.id, 0]);
    setValue('main_category_id', categoryInfo.id);
  };

  const handleNextClick = () => {
    if (!categoryId) {
      setIsError(true);
    } else {
      setIsError(false);
      onNext();
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
      {isError && <ErrorMessage message={ERRORMESSAGE.category} />}

      <div className={styles.category__footer}>
        <button className={styles.category__cancel} type="button" onClick={onPrev}>취소</button>
        <button
          className={cn({
            [styles.category__next]: true,
            [styles['category__next--disable']]: categoryId.length === 0,
          })}
          disabled={categoryId.length === 0}
          type="button"
          onClick={handleNextClick}
        >
          확인
        </button>
      </div>
    </div>
  );
}
