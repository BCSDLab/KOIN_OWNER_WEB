import useMyShop from 'query/shop';
import { Link } from 'react-router-dom';
import MenuTable from 'page/MyShopPage/components/MenuTable';
import { useClickImage } from 'utils/hooks/useClickImage';
import styles from './index.module.scss';

export default function EditMenu() {
  const { menusData } = useMyShop();
  const { onClickImage } = useClickImage();

  if (!menusData) return null;

  return (
    <div>
      <div className={styles.menu__add}>
        <Link to="/owner/add-menu">
          <div className={styles['menu__add--button']}>
            + 메뉴추가
          </div>
        </Link>
      </div>
      <MenuTable
        shopMenuCategories={menusData?.menu_categories || []}
        onClickImage={onClickImage}
        isEdit
        headerOffset={74}
      />
    </div>
  );
}
