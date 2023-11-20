import React, { useState } from 'react';
import { ReactComponent as GearIcon } from 'assets/svg/mystore/gear.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/className';
import styles from './MenuCategory.module.scss';

interface MenuCategory {
  id: number;
  name: string;
}

export default function MenuCategory() {
  const { isMobile } = useMediaQuery();
  const [menuCategories/* , setMenuCategories */] = useState<MenuCategory[]>([
    { id: 1, name: '이벤트 메뉴' },
    { id: 2, name: '대표 메뉴' },
    { id: 3, name: '사이드 메뉴' },
    { id: 4, name: '세트 메뉴' },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<MenuCategory[]>([]);
  const appendSelectCategory = (category: MenuCategory) => {
    if (selectedCategories.some((alreadySelected) => alreadySelected.id === category.id)) {
      setSelectedCategories(
        selectedCategories.filter((alreadySelected) => alreadySelected.id !== category.id),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
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
            {menuCategories.map((category) => (
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
        </div>
      ) : (
        <div className={styles.container}>
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
            {menuCategories.map((category) => (
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
        </div>
      )}
    </div>
  );
}
