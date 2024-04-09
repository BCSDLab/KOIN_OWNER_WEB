import { useState } from 'react';
import { Menus } from 'model/Coop';
import MenuCard from './components/MenuCard';
import MenuType from './components/MenuType';
import styles from './Coop.module.scss';

export default function Coop() {
  const [selectedMenuType, setSelectedMenuType] = useState<Menus>('아침');
  return (
    <div className={styles['container-wrapper']}>
      <div className={styles.container}>
        <MenuType selectedMenuType={selectedMenuType} setSelectedMenuType={setSelectedMenuType} />
        <MenuCard selectedMenuType={selectedMenuType} />
      </div>
    </div>
  );
}
