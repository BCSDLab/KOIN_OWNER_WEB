import useStoreCategory from 'query/storeCategory';
import { useState } from 'react';
import cn from 'utils/ts/className';
import CommonModal from 'component/common/CommonModal';
import styles from './Category.module.scss';

export default function CategoryModal({ isOpen, modalHandler }: any) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { categoryList } = useStoreCategory();

  if (!isOpen) return null;

  return (
    <CommonModal title="카테고리 검색" isOpen={isOpen} modalHandler={modalHandler} modalSize="small">
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
    </CommonModal>
  );
}
