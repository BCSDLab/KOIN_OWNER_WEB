import React from 'react';
import { ReactComponent as GearIcon } from 'assets/svg/mystore/gear.svg';

import styles from './MenuKategorie.module.scss';

export default function MenuKategorie() {
  return (
    <div className={styles.container}>
      <div className={styles['kategorie-header']}>
        <div className={styles['caption-container']}>
          <div className={styles['kategorie-header__caption']}>
            메뉴 카테고리
          </div>
          <div className={styles['kategorie-header__condition']}>
            (최대 선택 n개)
          </div>
        </div>
        <GearIcon className={styles['kategorie-header__icon']} />
      </div>
      <div className={styles['kategorie-btns']}>
        <button
          className={styles['event-menu']}
          type="button"
        >
          이벤트 메뉴
        </button>
        <button
          className={styles['signature-menu']}
          type="button"
        >
          대표 메뉴
        </button>
        <button
          className={styles['side-menu']}
          type="button"
        >
          사이드 메뉴
        </button>
        <button
          className={styles['set-menu']}
          type="button"
        >
          세트 메뉴
        </button>
      </div>
    </div>
  );
}
