import { ReactComponent as EventMarkIcon } from 'assets/svg/mystore/event-menu-mark.svg';
// import { Menu } from 'model/storeInfo/menuCategory';
// import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import styles from './CatagoryMenuList.module.scss';

interface Props {
  name: string;
  // menus: Menu[];
}
export default function CatagoryMenuList({ name }: Props) {
  return (
    <div>
      <div className={styles.category__title}>
        {name}
        {name === '이벤트 메뉴' ? (
          <EventMarkIcon className={styles['category__event-mark']} />) : null}
      </div>
      <div className={styles.menu__wrapper}>
        {/* {menus.map((menu) => (menu.img === null ? (
          <div key={menu.img} className={styles.menu__item}>
            <div className={styles['menu__empty-img']}>
              <CUTLERY className={styles['menu__empty-img-icon']} />
              <span className={styles['menu__empty-img-caption']}>이미지 준비 중입니다.</span>
            </div>
            <div>
              <span className={styles.menu__name} key={name}>{menu.name}</span>
              <div className={styles.menu__price}>
                {menu.option_price.map((option) => (
                  <span className={styles['menu__price-unit']} key={option.option}>
                    {option.price !== null
                      ? `${option.option}:${option.price.toLocaleString()}` : `${option.option}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (<img src={menu.img} alt="menu" className={styles.menu__img} />)
        ))} */}
      </div>
    </div>
  );
}
