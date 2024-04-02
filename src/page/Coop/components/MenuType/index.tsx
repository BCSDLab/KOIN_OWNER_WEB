import { useState } from 'react';
import cn from 'utils/ts/className';
import { Menus } from 'model/Coop';
import styles from './MenuType.module.scss';

interface MenuTypeProps {
  selectedMenuType: Menus;
  setSelectedMenuType: (menuType: Menus) => void;
}

export default function MenuType({ selectedMenuType, setSelectedMenuType }: MenuTypeProps) {
  return (
    <div className={styles.place__container}>
      <button
        className={cn({
          [styles['place__button--selected']]: selectedMenuType === '아침',
          [styles['place__button--unselected']]: selectedMenuType !== '아침',
        })}
        onClick={() => setSelectedMenuType('아침')}
        onKeyDown={(e) => e.key === 'Enter' && setSelectedMenuType('아침')}
        type="button"
        tabIndex={0}
      >
        아침
      </button>
      <button
        className={cn({
          [styles['place__button--selected']]: selectedMenuType === '점심',
          [styles['place__button--unselected']]: selectedMenuType !== '점심',
        })}
        onClick={() => setSelectedMenuType('점심')}
        onKeyDown={(e) => e.key === 'Enter' && setSelectedMenuType('점심')}
        type="button"
        tabIndex={0}
      >
        점심
      </button>
      <button
        className={cn({
          [styles['place__button--selected']]: selectedMenuType === '저녁',
          [styles['place__button--unselected']]: selectedMenuType !== '저녁',
        })}
        onClick={() => setSelectedMenuType('저녁')}
        onKeyDown={(e) => e.key === 'Enter' && setSelectedMenuType('저녁')}
        type="button"
        tabIndex={0}
      >
        저녁
      </button>
    </div>
  );
}
