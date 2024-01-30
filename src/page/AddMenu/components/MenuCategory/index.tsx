import React, { useEffect, useState } from 'react';
import { ReactComponent as GearIcon } from 'assets/svg/mystore/gear.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useAddMenuStore from 'store/addMenu';
import useMyShop from 'query/shop';
import cn from 'utils/ts/className';
import { useErrorMessageStore } from 'store/addMenuErrorMessageStore';
import styles from './MenuCategory.module.scss';

interface MenuCategory {
  id: number;
  name: string;
}
interface MenuCategoryProps {
  isComplete: boolean;
}
export default function MenuCategory({ isComplete }:MenuCategoryProps) {
  const { isMobile } = useMediaQuery();
  const { shopData } = useMyShop();
  const { categoryIds, setCategoryIds } = useAddMenuStore();
  const { categoryError } = useErrorMessageStore();
  const [selectedCategories, setSelectedCategories] = useState<MenuCategory[]>([]);
  const appendSelectCategory = (category: MenuCategory) => {
    const newSelected = selectedCategories.map(({ id }) => id).includes(category.id)
      ? selectedCategories.filter((c) => c.id !== category.id)
      : [...selectedCategories, category];
    setSelectedCategories(newSelected);
    setCategoryIds(newSelected.map((cat) => cat.id));
  };
  useEffect(() => {
    if (shopData) {
      setSelectedCategories(shopData.menu_categories.filter(({ id }) => categoryIds.includes(id)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopData, categoryIds]);

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          {isComplete ? (
            <>
              <div className={styles['mobile__category-header']}>
                <div className={styles['mobile__caption-container']}>
                  <div className={styles['mobile__category-header__caption']}>
                    메뉴 카테고리
                  </div>
                </div>
              </div>
              <div className={styles['mobile__category-text-container']}>
                {selectedCategories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <div className={styles['mobile__category-text']}>
                      {category.name}
                    </div>
                    {index < selectedCategories.length - 1 && <span>/</span>}
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className={styles['mobile__category-header']}>
                <div className={styles['mobile__caption-container']}>
                  <div className={styles['mobile__category-header__caption']}>
                    메뉴 카테고리
                  </div>
                  <div className={styles['mobile__category-header__condition']}>
                    (최대 선택 n개)
                  </div>
                </div>
                <GearIcon className={styles['mobile__category-header__icon']} />
              </div>
              <div className={styles['mobile__category-button-container']}>
                {shopData && shopData.menu_categories.map((category) => (
                  <button
                    key={category.id}
                    className={cn({
                      [styles['mobile__category-button']]: true,
                      [styles['mobile__category-button--selected']]: selectedCategories.some((c) => c.id === category.id),
                    })}
                    type="button"
                    onClick={() => appendSelectCategory(category)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          {isComplete ? (
            <>
              <div className={styles['category-header']}>
                <div className={styles['caption-container']}>
                  <div className={styles['category-header__caption']}>
                    메뉴 카테고리
                  </div>
                </div>
              </div>
              <div className={styles['category-text-container']}>
                {selectedCategories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <div className={styles['category-text']}>
                      {category.name}
                    </div>
                    {index < selectedCategories.length - 1 && <span>/</span>}
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className={styles['category-header']}>
                <div className={styles['caption-container']}>
                  <div className={styles['category-header__caption']}>
                    메뉴 카테고리
                  </div>
                  <div className={styles['category-header__condition']}>
                    (최대 선택 n개)
                  </div>
                </div>
                <GearIcon className={styles['category-header__icon']} />
              </div>
              <div className={styles['category-button-container']}>
                {shopData && shopData.menu_categories.map((category) => (
                  <button
                    key={category.id}
                    className={cn({
                      [styles['category-button']]: true,
                      [styles['category-button--selected']]: selectedCategories.some((c) => c.id === category.id),
                    })}
                    type="button"
                    onClick={() => appendSelectCategory(category)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {categoryError && <span className={styles['error-message']}>{categoryError}</span>}
    </div>
  );
}
