import { ReactComponent as LogoIcon } from 'assets/svg/common/coin-logo.svg';
import { ReactComponent as LogoMobileIcon } from 'assets/svg/common/coin-logo-mobile.svg';
import { ReactComponent as MenuIcon } from 'assets/svg/common/hamburger-menu.svg';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CATEGORY, { Category, SubMenu } from 'static/category';
import cn from 'utils/ts/className';
import useBooleanState from 'utils/hooks/useBooleanState';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { createPortal } from 'react-dom';
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

const useMobileSidebar = (pathname: string, isMobile: boolean) => {
  const [isExpanded,,expandSidebar, hideSidebar] = useBooleanState(false);

  useEffect(() => {
    if (!isMobile) {
      hideSidebar();
    }
  }, [hideSidebar, isMobile]);

  useEffect(() => {
    hideSidebar();
  }, [hideSidebar, pathname]);

  return {
    isExpanded,
    expandSidebar,
    hideSidebar,
  };
};

function Header() {
  const { pathname } = useLocation();
  const {
    panelMenuList,
    isExpanded: isMegaMenuExpanded,
    createOnChangeMenu,
    onFocusPanel,
    hideMegaMenu,
  } = useMegaMenu(CATEGORY);
  const { isMobile } = useMediaQuery();
  const {
    isExpanded: isMobileSidebarExpanded,
    expandSidebar,
    hideSidebar,
  } = useMobileSidebar(pathname, isMobile);

  const isMain = true; // pathname === '/';
  const navigate = useNavigate();
  // Auth 완료 되면 추후에 수정 필요
  const [userInfo] = useState<{ name: string; } | null>(null);

  return (
    <header
      className={cn({
        [styles.header]: true,
        [styles['header--main']]: isMain,
      })}
    >
      <nav className={styles.header__content}>
        {isMobile ? (
          <>
            <div
              className={styles.mobileheader}
            >
              {!isMain && (
                <button
                  className={cn({
                    [styles['mobileheader__icon--left']]: true,
                    [styles.mobileheader__icon]: true,
                  })}
                  type="button"
                >
                  <img src="https://static.koreatech.in/assets/img/back-menu.png" alt="go back logo" title="go back logo" />
                </button>
              )}
              <span className={styles.mobileheader__title}>
                {isMain ? (
                  <LogoMobileIcon title="코인 로고" />
                ) : (CATEGORY
                  .flatMap((categoryValue) => categoryValue.submenu)
                  .find((subMenuValue) => subMenuValue.link === pathname)
                  ?.title ?? ''
                )}
              </span>
              <button
                className={cn({
                  [styles['mobileheader__icon--right']]: true,
                  [styles.mobileheader__icon]: true,
                })}
                type="button"
                onClick={expandSidebar}
                aria-expanded={isMobileSidebarExpanded}
              >
                <MenuIcon title="메뉴" />
              </button>
            </div>
            {createPortal(
              (
                <nav className={cn({
                  [styles.mobileheader__panel]: true,
                  [styles['mobileheader__panel--show']]: isMobileSidebarExpanded,
                  [styles['mobileheader__panel--logged-in']]: true,
                })}
                >
                  <div className={styles.mobileheader__user}>
                    <button
                      className={styles.mobileheader__backspace}
                      type="button"
                      onClick={hideSidebar}
                    >
                      <img src="http://static.koreatech.in/assets/img/arrow_left.png" alt="go back" title="go back" />
                    </button>
                    <div className={styles.mobileheader__greet}>
                      {/* Auth 완료시 수정 필요 */}
                      {userInfo?.name}
                      <span>님, 안녕하세요!</span>
                    </div>
                    <ul className={styles['mobileheader__auth-menu']}>
                      <li className={styles['mobileheader__my-info']}>
                        <Link to="/modify-info">
                          내 정보
                        </Link>
                      </li>
                      <li className={styles.mobileheader__link}>
                        <button
                          type="button"
                          onClick={() => navigate('/login', { replace: true })}
                        >
                          로그아웃
                        </button>
                      </li>
                    </ul>
                  </div>
                  {CATEGORY.map((categoryInfo) => (
                    <div key={categoryInfo.title}>
                      <div>
                        <div className={styles['mobileheader__category-title']}>
                          {categoryInfo.title}
                        </div>
                        <ul className={styles['mobileheader__sub-menus']}>
                          {categoryInfo.submenu.map((subMenu) => (
                            <li
                              className={styles['mobileheader__sub-menu']}
                              key={subMenu.title}
                            >
                              <Link to={subMenu.link}>
                                {subMenu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                  <img
                    className={cn({
                      [styles.mobileheader__logo]: true,
                      [styles['mobileheader__logo--bcsd']]: true,
                    })}
                    src="http://static.koreatech.in/assets/img/ic-bcsd_gray.png"
                    alt="bcsd lab logo"
                    title="bcsd lab logo"
                  />
                  <img
                    className={cn({
                      [styles.mobileheader__logo]: true,
                      [styles['mobileheader__logo--koin']]: true,
                    })}
                    src="http://static.koreatech.in/assets/img/rectangle_icon.png"
                    alt="KOIN service logo"
                    title="bcsd lab logo"
                  />
                </nav>
              ),
              document.body,
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;