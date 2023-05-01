import { ReactComponent as EventMarkIcon } from 'assets/svg/mystore/event-menu-mark.svg';
import { Menu } from 'static/menuCategory';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import styles from './MystorePage.module.scss';

export default function Menus({ menus }: { menus:Menu[] }) {
  return (
    <>
      {menus.map((menu) => (
        <>
          <div className={styles['menu__title-wrapper']}>
            <div className={styles.menu__title}>
              {menu.name}
              {menu.name === '이벤트 메뉴' ? (
                <EventMarkIcon className={styles['menu__event-menu-icon--mark']} />) : null}
            </div>
          </div>
          <div className={styles.menu__wrapper}>
            {menu.menus.map((eachMenu) => (eachMenu.img === null ? (
              <div className={styles.menu__item}>
                <div key={eachMenu.img} className={styles['menu__empty-img']}>
                  <CUTLERY className={styles['menu__empty-img--icon']} />
                  <span className={styles['menu__empty-img--caption']}>이미지 준비 중입니다.</span>
                </div>
                <div>
                  <span className={styles.menu__name} key={menu.name}>{eachMenu.name}</span>
                  <div className={styles.menu__price}>
                    {eachMenu.option_price.map((option) => (
                      <span className={styles['menu__price--unit']} key={option.option}>
                        {option.price !== null
                          ? `${option.option}:${option.price.toLocaleString()}` : `${option.option}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (<img src={eachMenu.img} alt="menu" className={styles.menu__img} />)
            ))}
          </div>
        </>
      ))}
    </>
  );
}
