import { ReactComponent as LogoIcon } from 'assets/svg/common/koin-logo.svg';
import { ReactComponent as MobileLogoIcon } from 'assets/svg/common/mobile-koin-logo.svg';
import { ReactComponent as MenuIcon } from 'assets/svg/common/hamburger-menu.svg';
import { ReactComponent as BackArrowIcon } from 'assets/svg/common/back-arrow.svg';
import { Link, useLocation } from 'react-router-dom';
import CATEGORY from 'utils/constant/category';
import cn from 'utils/ts/className';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { createPortal } from 'react-dom';
import { postLogout } from 'api/auth';
import useUserStore from 'store/user';
import styles from './Header.module.scss';
import useMobileSidebar from './hooks/useMobileSidebar';
import useMegaMenu from './hooks/useMegaMenu';

const ID: { [key: string]: string; } = {
  PANEL: 'megamenu-panel',
  LABEL1: 'megamenu-label-1',
  LABEL2: 'megamenu-label-2',
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
  const isMain = true;
  const { user, removeUser } = useUserStore();

  const logout = () => {
    postLogout()
      .then(() => {
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        removeUser();
      });
  };

  if ((pathname === '/add-menu' || pathname.startsWith('/modify-menu/') || pathname === '/event-add') && isMobile) {
    return (
      <header className={styles['add-menu-header']}>
        <button
          className={styles['add-menu-header__goBackButton']}
          type="button"
          onClick={() => window.history.back()}
        >
          <BackArrowIcon title="뒤로 가기 버튼" />
        </button>
        <div className={styles['add-menu-header__caption']}>
          {pathname === '/add-menu' && '메뉴추가'}
          {pathname === '/event-add' && '이벤트/공지 추가하기'}
          {pathname !== '/add-menu' && pathname !== '/event-add' && '메뉴수정'}
        </div>
      </header>
    );
  }

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
                {pathname === '/' || pathname === '/coop' ? (
                  <MobileLogoIcon title="코인 로고" />
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
                      <BackArrowIcon title="뒤로 가기 버튼" />
                    </button>
                    <div className={styles.mobileheader__greet}>
                      {user?.name}
                      <span>님, 안녕하세요!</span>
                    </div>
                    <ul className={styles['mobileheader__auth-menu']}>
                      <li className={styles['mobileheader__my-info']}>
                        <Link to="/modify-info">
                          내 정보
                        </Link>
                      </li>
                      <li className={styles.mobileheader__link}>
                        <button type="button" onClick={logout}>
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
                                {subMenu.title === '가게정보' && subMenu.title}
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
                        {menu.title === '가게정보' && menu.title}
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
                <button type="button" onClick={logout}>
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
