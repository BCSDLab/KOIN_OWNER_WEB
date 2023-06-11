import { ReactComponent as EventMarkIcon } from 'assets/svg/mystore/event-menu-mark.svg';
import { MenuCategory } from 'model/storeInfo/menuCategory';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './CatagoryMenuList.module.scss';

export default function CatagoryMenuList({ menus }: { menus: MenuCategory }) {
  const { isMobile } = useMediaQuery();

  return (
    <div>
      {isMobile ? (
        <div>
          <div className={styles.mobilecategory__title}>
            {menus.name}
            {menus.name === '이벤트 메뉴' ? (
              <EventMarkIcon className={styles['mobilecategory__event-mark']} />) : null}
          </div>
          <div className={styles.mobilemenu__wrapper}>
            {menus.menus.map((menu) => (menu.image_urls?.length === 0 ? (
              <div key={menus.id} className={styles.mobilemenu__item}>
                <div className={styles['mobilemenu__empty-img']}>
                  <CUTLERY className={styles['mobilemenu__empty-img-icon']} />
                  <span className={styles['mobilemenu__empty-img-caption']}>이미지 준비 중입니다.</span>
                </div>
                <div>
                  <span className={styles.mobilemenu__name} key={menus.name}>{menus.name}</span>
                  <div className={styles.mobilemenu__price}>
                    {menu.option_prices && menu.option_prices.map((option) => (
                      <span className={styles['mobilemenu__price-unit']} key={option.option}>
                        {`${option.option}:${option.price.toLocaleString()}원`}
                      </span>
                    ))}
                    {menu.single_price && (
                    <span className={styles['mobilemenu__price-unit']}>
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
      ) : (
        <div>
          <div className={styles.category__title}>
            {menus.name}
            {menus.name === '이벤트 메뉴' ? (
              <EventMarkIcon className={styles['category__event-mark']} />) : null}
          </div>
          <div className={styles.menu__wrapper}>
            {menus.menus.map((menu) => (menu.image_urls?.length === 0 ? (
              <div key={menu.id} className={styles.menu__item}>
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
      )}
    </div>

  );
}
