import { useNavigate } from 'react-router-dom';
import { ReactComponent as EventMarkIcon } from 'assets/svg/mystore/event-menu-mark.svg';
import { MenuCategory } from 'model/shopInfo/menuCategory';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import styles from './CatagoryMenuList.module.scss';

export default function CatagoryMenuList({ menuCategory }: { menuCategory: MenuCategory }) {
  const navigate = useNavigate();
  const handleMenuClick = (menuId: number) => {
    navigate(`/owner/modify-menu/${menuId}`);
  };
  return (
    <div>
      <div className={styles.category__title}>
        {menuCategory.name}
        {menuCategory.name === '이벤트 메뉴' ? ( // 해당 부분 마커 유무 api res필요
          <EventMarkIcon className={styles['category__event-mark']} />) : null}
      </div>
      <div className={styles['menu__slide-wrapper']}>
        <div className={styles.menu__content}>
          {menuCategory.menus.map((menu) => (
            <button
              type="button"
              key={menu.name}
              className={styles.menu__item}
              onClick={() => handleMenuClick(menu.id)}
            >
              {menu.image_urls?.length === 0 ? (
                <div className={styles['menu__non-img-border']}>
                  <div className={styles['menu__empty-img']}>
                    <CUTLERY className={styles['menu__empty-img-icon']} />
                    <span className={styles['menu__empty-img-caption']}>이미지 준비 중입니다.</span>
                  </div>
                </div>
              ) : (
                <div className={styles['menu__img-border']}>
                  <img src={menu.image_urls[0]} alt="menu" className={styles['menu__menu-img']} />
                </div>
              )}
              <div>
                <span className={styles.menu__name} key={menu.name}>{menu.name}</span>
                <div className={styles.menu__price}>
                  {menu.option_prices ? menu.option_prices
                    .sort((a, b) => a.price - b.price)
                    .map((option) => ( // 옵션 가격이 있을 경우
                      <span className={styles['menu__price-unit']} key={option.option}>
                        {`${option.option}:${option.price.toLocaleString()}원`}
                      </span>
                    )) : ( // 단일 가격이 있을 경우
                      <span className={styles['menu__price-unit']}>
                        {`${menu.single_price.toLocaleString()}원`}
                      </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
