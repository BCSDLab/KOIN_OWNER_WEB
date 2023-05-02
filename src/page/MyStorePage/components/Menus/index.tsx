import { ReactComponent as EventMarkIcon } from 'assets/svg/mystore/event-menu-mark.svg';
import { Menu, MenuCategories } from 'model/storeInfo/menuCategory';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import styles from './Menus.module.scss';

export default function Menus({ categories }: { categories:MenuCategories[] }) {
  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          <div className={styles['menu__title-wrapper']}>
            <div className={styles.menu__title}>
              {category.name}
              {category.name === '이벤트 메뉴' ? (
                <EventMarkIcon className={styles['menu__event-menu-icon--mark']} />) : null}
            </div>
          </div>
          <div className={styles.menu__wrapper}>
            {category.menus.map((menu: Menu) => (menu.img === null ? (
              <div key={menu.img} className={styles.menu__item}>
                <div className={styles['menu__empty-img']}>
                  <CUTLERY className={styles['menu__empty-img--icon']} />
                  <span className={styles['menu__empty-img--caption']}>이미지 준비 중입니다.</span>
                </div>
                <div>
                  <span className={styles.menu__name} key={category.name}>{menu.name}</span>
                  <div className={styles.menu__price}>
                    {menu.option_price.map((option) => (
                      <span className={styles['menu__price--unit']} key={option.option}>
                        {option.price !== null
                          ? `${option.option}:${option.price.toLocaleString()}` : `${option.option}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (<img src={menu.img} alt="menu" className={styles.menu__img} />)
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
