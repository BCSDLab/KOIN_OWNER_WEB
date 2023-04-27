import MENU_SAMPLE from 'static/sampleMenuResponse';
import { ReactComponent as CUTLERY } from 'assets/svg/mystore/cutlery.svg';
import styles from './MystorePage.module.scss';

export default function Menus() {
  MENU_SAMPLE.forEach((menu) => {
    console.log(`name${menu.name}`);
    menu.option_price.forEach((option) => {
      console.log(`price${option.option}${option.price}`);
    // console.log(`here${menu.option_price}`);
    });
  });

  return (
    <div className={styles.menu__wrapper}>
      <div className={styles.menu__item}>
        <div className={styles.menu__img}>
          <CUTLERY className={styles['menu__img--icon']} />
          <span className={styles['menu__img--caption']}>이미지 준비 중입니다.</span>
        </div>
        <div>{}</div>
        <div>소:22000</div>
      </div>
    </div>
  );
}
