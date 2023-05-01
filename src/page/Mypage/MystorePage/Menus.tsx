import { ReactComponent as EventMarkIcon } from 'assets/svg/mystore/event-menu-mark.svg';
import MENU_SAMPLE from 'static/sampleMenuResponse';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import styles from './MystorePage.module.scss';

export default function Menus() {
  return (
    <>
      <div className={styles['menu__title-wrapper']}>
        <div className={styles.menu__title}>
          이벤트 메뉴
          <EventMarkIcon className={styles['menu__event-menu-icon--mark']} />
        </div>
      </div>
      <div className={styles.menu__wrapper}>
        {MENU_SAMPLE.map((menu) => (menu.img === null ? (
          <div className={styles.menu__item}>
            <div key={menu.img} className={styles['menu__empty-img']}>
              <CUTLERY className={styles['menu__empty-img--icon']} />
              <span className={styles['menu__empty-img--caption']}>이미지 준비 중입니다.</span>
            </div>
            <div>
              <span className={styles.menu__name} key={menu.name}>{menu.name}</span>
              <div className={styles.menu__price}>
                {menu.option_price.map((option) => (
                  <span className={styles['menu__price--unit']} key={option.option}>
                    {option.price !== null ? `${option.option}:${option.price.toLocaleString()}` : `${option.option}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (<img src={menu.img} alt="menu" className={styles.menu__img} />
        )))}
      </div>
    </>
  );
}
