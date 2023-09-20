import { createPortal } from 'react-dom';
import CustomButton from 'page/StoreRegistration/component/CustomButton';
import { ReactComponent as XClose } from 'assets/svg/storereg/close-x.svg';
import useStoreCategory from 'query/storeCategory';
import { useState } from 'react';
import cn from 'utils/ts/className';
import styles from './Category.module.scss';

interface CategoryProps {
  isOpen: boolean;
  modalHandler: (event: React.MouseEvent) => void;
}

export default function CategoryModal({ isOpen, modalHandler }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { categoryList } = useStoreCategory();

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.content__header}>
          <span className={styles.content__title}>
            카테고리 검색
          </span>
          <XClose
            id="categoryModal"
            onClick={modalHandler}
            className={styles['content__close-button']}
          />
        </div>
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
        <div className={styles['content__next-button']}>
          <CustomButton content="다음" buttonType="large" modalId="categoryModal" onClick={modalHandler} />
        </div>
      </div>
    </div>,
    document.body as HTMLElement,
  );
}
