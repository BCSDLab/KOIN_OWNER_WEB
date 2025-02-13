import useMyShop from 'query/shop';
import { Link } from 'react-router-dom';
import MenuTable from 'page/MyShopPage/components/MenuTable';
import { useClickImage } from 'utils/hooks/useClickImage';

export default function EditMenu() {
  const { menusData } = useMyShop();
  const { onClickImage } = useClickImage();

  if (!menusData) return null;

  return (
    <div>
      <Link to="/owner/add-menu">
        + 메뉴추가
      </Link>
      <MenuTable
        shopMenuCategories={menusData?.menu_categories || []}
        onClickImage={onClickImage}
        isEdit
      />
    </div>
  );
}
