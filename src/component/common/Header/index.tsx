import { ReactComponent as LogoIcon } from 'assets/svg/common/coin-logo.svg';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CATEGORY, { Category, SubMenu } from 'static/category';
import cn from 'utils/ts/className';
import styles from './Header.module.scss';

const ID: { [key: string]: string; } = {
  PANEL: 'megamenu-panel',
  LABEL1: 'megamenu-label-1',
  LABEL2: 'megamenu-label-2',
};

const useMegaMenu = (category: Category[]) => {
  const [panelMenuList, setPanelMenuList] = useState<SubMenu[] | null>();
  const [isExpanded, setIsExpanded] = useState(false);

  const createOnChangeMenu = (title: string) => () => {
    const selectedSubMenu = category
      .find((categoryInfo) => categoryInfo.title === title)?.submenu ?? null;
    setPanelMenuList(selectedSubMenu);
    setIsExpanded(true);
  };
  const onFocusPanel = () => {
    setIsExpanded(true);
  };
  const hideMegaMenu = (
    event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
  ) => {
    if (event.type === 'mouseout') {
      const { currentTarget } = event;
      currentTarget.blur();
    }
    setIsExpanded(false);
  };

  return {
    panelMenuList,
    isExpanded,
    createOnChangeMenu,
    onFocusPanel,
    hideMegaMenu,
  };
};

function Header() {
  const {
    panelMenuList,
    isExpanded: isMegaMenuExpanded,
    createOnChangeMenu,
    onFocusPanel,
    hideMegaMenu,
  } = useMegaMenu(CATEGORY);

  // Auth 완료 되면 추후에 수정
  const isMain = true; // pathname === '/';
  const navigate = useNavigate();

  return (
    <header
      className={cn({
        [styles.header]: true,
        [styles['header--main']]: isMain,
      })}
    >
      <nav className={styles.header__content}>
        <Link
          className={styles.header__logo}
          to="/"
          tabIndex={0}
        >
          <LogoIcon title="코인 로고" />
        </Link>
        <div
          className={cn({
            [styles['header__mega-menu']]: true,
            [styles.megamenu]: true,
          })}
          onBlur={hideMegaMenu}
          onMouseOut={hideMegaMenu}
        >
          <ul className={styles['megamenu__trigger-list']}>
            {CATEGORY.map((category) => (
              <li
                key={category.title}
              >
                <button
                  className={styles.megamenu__trigger}
                  tabIndex={0}
                  type="button"
                  onClick={createOnChangeMenu(category.title)}
                  onFocus={createOnChangeMenu(category.title)}
                  onBlur={hideMegaMenu}
                  onMouseOver={createOnChangeMenu(category.title)}
                  onMouseOut={hideMegaMenu}
                  aria-expanded={isMegaMenuExpanded}
                >
                  <span>
                    {category.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div
            id={ID.PANEL}
            className={styles.megamenu__panel}
            onFocus={onFocusPanel}
            onMouseOver={onFocusPanel}
            aria-hidden={!isMegaMenuExpanded}
            aria-labelledby={Array.from({ length: 2 }, (_, index) => ID[`LABEL${index + 1}`]).join(' ')}
          >
            <ul className={styles.megamenu__content}>
              {panelMenuList?.map((menu) => (
                <li className={styles.megamenu__menu} key={menu.title}>
                  <Link className={styles.megamenu__link} to={menu.link}>
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className={styles['header__auth-menu']}>
          {/* Auth 완료시 수정 필요 */}
          <li className={styles['header__auth-link']}>
            <Link to="/modify-info">
              정보수정
            </Link>
          </li>
          <li className={styles['header__auth-link']}>
            <button type="button" onClick={() => navigate('/login', { replace: true })}>
              로그아웃
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
