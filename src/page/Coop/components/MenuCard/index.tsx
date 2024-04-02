import { useGetDining } from 'query/coop';
import { Menus } from 'model/Coop';
import SoldoutToggle from 'page/Coop/components/SoldoutToggle';
import styles from './MenuCard.module.scss';

interface MenuCardProps {
  selectedMenuType: Menus;
}

export default function MenuCard({ selectedMenuType }: MenuCardProps) {
  const { data } = useGetDining();
  return (
    <div className={styles.container}>
      <div>
        <h2>{selectedMenuType}</h2>
      </div>
      <div className={styles.menu}>
        <div className={styles.card}>
          <div className={styles.card__header}>
            <span className={styles.card__title}>A코너</span>
            <div className={styles.card__wrapper}>
              <span className={styles.card__soldout}>품절</span>
              <SoldoutToggle />
            </div>
          </div>
          <div className={styles.card__wrapper}>
            <div className={styles.card__image}>이미지공간</div>
            <div className={styles.card__content}>
              <span>피자</span>
              <span>치킨</span>
            </div>
          </div>

        </div>
        {data?.map((menu:any) => (
          <div key={menu.id} className={styles.menuCard}>
            <h2>{menu.place}</h2>
            <p>{menu.menu.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
