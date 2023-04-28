import MENU_SAMPLE from 'static/sampleMenuResponse';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import styles from './MystorePage.module.scss';

export default function Menus() {
  function addComma(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div className={styles.menu__wrapper}>
      <div className={styles.menu__item}>
        {MENU_SAMPLE.map((menu) => (menu.img === null ? (
          <div key={menu.img} className={styles['menu__empty-img']}>
            <CUTLERY className={styles['menu__empty-img--icon']} />
            <span className={styles['menu__empty-img--caption']}>이미지 준비 중입니다.</span>
          </div>
        ) : <img src={menu.img} alt="error" />
        ))}
        <div>
          {MENU_SAMPLE.map((menu) => (
            <span className={styles.menu__name} key={menu.name}>{menu.name}</span>))}
          <div className={styles.menu__price}>
            {MENU_SAMPLE.map((menu) => (
              menu.option_price.map((option) => (
                <span className={styles['menu__price--unit']} key={option.option}>
                  {option.price !== null ? `${option.option}:${addComma(option.price)}` : `${option.option}`}
                </span>
              ))
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
