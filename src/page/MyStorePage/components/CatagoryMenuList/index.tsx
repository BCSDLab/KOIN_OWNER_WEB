import { ReactComponent as EventMarkIcon } from 'assets/svg/mystore/event-menu-mark.svg';
import { MenuCategory } from 'model/storeInfo/menuCategory';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import styles from './CatagoryMenuList.module.scss';

export default function CatagoryMenuList({ menus }: { menus: MenuCategory }) {
  return (
    <div>
      <div className={styles.category__title}>
        {menus.name}
        {menus.name === '이벤트 메뉴' ? (
          <EventMarkIcon className={styles['category__event-mark']} />) : null}
      </div>
      <div className={styles['menu__slide-wrapper']}>
        <div className={styles.menu__content}>
          {menus.menus.map((menu) => (menu.image_urls?.length === 0 ? (
            <div key={menus.id} className={styles.menu__item}>
              <div className={styles['menu__empty-img']}>
                <CUTLERY className={styles['menu__empty-img-icon']} />
                <span className={styles['menu__empty-img-caption']}>이미지 준비 중입니다.</span>
              </div>
              <div>
                <span className={styles.menu__name} key={menu.name}>{menu.name}</span>
                <div className={styles.menu__price}>
                  {menu.option_prices && menu.option_prices.map((option) => (
                    <span className={styles['menu__price-unit']} key={option.option}>
                      {`${option.option}:${option.price.toLocaleString()}원`}
                    </span>
                  ))}
                  {menu.single_price && (
                    <span className={styles['menu__price-unit']}>
                      {`${menu.single_price.toLocaleString()}원`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            menu.image_urls.map((url) => (
              <img key={url} src={url} alt="menu" className={styles.menu__img} />
            ))
          )))}
        </div>
      </div>
    </div>
  );
}
