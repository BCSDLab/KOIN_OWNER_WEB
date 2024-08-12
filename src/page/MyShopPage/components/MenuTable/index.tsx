import { useEffect, useState } from 'react';
import { MenuCategory } from 'model/shopInfo/menuCategory';
import cn from 'utils/ts/className';
import MENU_CATEGORY from 'utils/constant/menu';
import { Link } from 'react-router-dom';
import ROUTES from 'static/routes';
import styles from './MenuTable.module.scss';

interface MenuTableProps {
  shopMenuCategories: MenuCategory[];
  onClickImage: (img: string[], index: number) => void;
}

const HEADER_OFFSET = 133; // categories 높이

function MenuTable({ shopMenuCategories, onClickImage }: MenuTableProps) {
  const [categoryType, setCategoryType] = useState<string>(shopMenuCategories[0].name);

  const handleScroll = () => {
    shopMenuCategories.forEach((menu) => {
      const element = document.getElementById(menu.name);
      if (element) {
        const categoryTop = element.getBoundingClientRect().top;
        const categoryBottom = element.getBoundingClientRect().bottom;
        if (categoryTop <= 0 && categoryBottom >= 0) {
          setCategoryType(menu.name);
        }
      }
    });
  };

  useEffect(() => {
    shopMenuCategories.forEach((menu) => {
      const element = document.getElementById(menu.name);
      element!.addEventListener('wheel', handleScroll);
    });

    return () => {
      shopMenuCategories.forEach((menu) => {
        const element = document.getElementById(menu.name);
        if (element) {
          element.removeEventListener('wheel', handleScroll);
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopMenuCategories]);

  const scrollToTarget = (name: string) => {
    const element = document.getElementById(name);
    if (element) {
      const elementPosistion = element.getBoundingClientRect().top;
      const categoryPosition = elementPosistion + window.scrollY - HEADER_OFFSET;

      window.scrollTo({
        top: categoryPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <ul className={styles.categories}>
        {MENU_CATEGORY.map((menuCategories) => (
          <li key={menuCategories.id}>
            <button
              className={cn({
                [styles.categories__tag]: true,
                [styles['categories__tag--active']]: categoryType === menuCategories.name,
                [styles['categories__tag--inactive']]: !shopMenuCategories.some((menu) => menuCategories.name === menu.name),
              })}
              type="button"
              onClick={() => {
                setCategoryType(menuCategories.name);
                scrollToTarget(menuCategories.name);
              }}
            >
              {menuCategories.name}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.table}>
        {shopMenuCategories.map((menuCategories) => (
          <div
            className={styles.menu}
            key={menuCategories.id}
            id={`${menuCategories.name}`}
          >
            {MENU_CATEGORY.map((category) => (
              category.name === menuCategories.name && (
                <div className={styles.menu__title} key={category.id}>
                  <img src={category.img} alt={category.name} />
                  {menuCategories.name}
                </div>
              )
            ))}
            {menuCategories.menus.map((menu) => (
              menu.option_prices === null ? (
                <div className={styles['menu-info']} key={menu.id}>
                  {menu.image_urls.length > 0 ? (
                    menu.image_urls.map((img, idx) => (
                      <div key={`${img}`} className={styles.image}>
                        <button
                          className={styles.image__button}
                          type="button"
                          onClick={() => onClickImage(menu.image_urls, idx)}
                        >
                          <img src={`${img}`} alt={`${menu.name}`} />
                        </button>
                      </div>
                    ))) : (
                      <div className={styles['empty-image']}>
                        <img
                          src="https://static.koreatech.in/assets/img/mainlogo2.png"
                          alt="KOIN service logo"
                        />
                      </div>
                  )}
                  <Link to={ROUTES.OwnerModifyMenu.general(menu.id)} className={styles['menu-info__modify']}>
                    <div className={styles['menu-info__card']}>
                      <span title={menu.name}>{menu.name}</span>
                      <span>
                        {!!menu.single_price && (
                          menu.single_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        )}
                        원
                      </span>
                    </div>
                  </Link>
                </div>
              ) : (
                menu.option_prices.map((item) => (
                  <div className={styles['menu-info']} key={menu.id + item.option}>
                    {menu.image_urls.length > 0 ? (
                      menu.image_urls.map((img, idx) => (
                        <div key={`${img}`} className={styles.image}>
                          <button
                            className={styles.image__button}
                            type="button"
                            onClick={() => onClickImage(menu.image_urls, idx)}
                          >
                            <img src={`${img}`} alt={`${menu.name}`} />
                          </button>
                        </div>
                      ))) : (
                        <div className={styles['empty-image']}>
                          <img
                            src="https://static.koreatech.in/assets/img/mainlogo2.png"
                            alt="KOIN service logo"
                          />
                        </div>
                    )}
                    <Link to={ROUTES.OwnerModifyMenu.general(menu.id)} className={styles['menu-info__modify']}>
                      <div className={styles['menu-info__card']}>
                        <span>{`${menu.name} - ${item.option}`}</span>
                        <span>
                          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          원
                        </span>
                      </div>
                    </Link>
                  </div>
                ))
              )
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default MenuTable;
