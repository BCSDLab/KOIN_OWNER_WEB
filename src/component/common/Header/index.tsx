import { ReactComponent as LogoIcon } from 'assets/svg/common/koin-logo.svg';
import { ReactComponent as BackArrowIcon } from 'assets/svg/common/back-arrow.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CATEGORY from 'utils/constant/category';
import cn from 'utils/ts/className';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useLogout } from 'query/auth';
import usePrevPathStore from 'store/path';
import styles from './Header.module.scss';
import useMegaMenu from './hooks/useMegaMenu';
import MobilePanel from './MobilePanel';

const ID: { [key: string]: string; } = {
  PANEL: 'megamenu-panel',
  LABEL1: 'megamenu-label-1',
  LABEL2: 'megamenu-label-2',
};

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useMediaQuery();

  const { setPrevPath } = usePrevPathStore((state) => state);
  const { logout } = useLogout();

  const {
    panelMenuList,
    isExpanded: isMegaMenuExpanded,
    createOnChangeMenu,
    onFocusPanel,
    hideMegaMenu,
  } = useMegaMenu(CATEGORY);

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => {
        setPrevPath('/login');
        navigate('/login');
      },
    });
  };

  if ((pathname === '/owner/add-menu'
    || pathname.startsWith('/owner/modify-menu/')
    || pathname.startsWith('/owner/event-add/'))
    && isMobile) {
    return (
      <header className={styles['add-menu-header']}>
        <button
          title="뒤로 가기 버튼"
          className={styles['add-menu-header__prev-button']}
          type="button"
          onClick={() => window.history.back()}
        >
          <BackArrowIcon title="뒤로 가기 버튼" />
        </button>
        <div className={styles['add-menu-header__caption']}>
          {pathname === '/owner/add-menu' && '메뉴추가'}
          {pathname.startsWith('/owner/modify-menu/') && '메뉴수정'}
          {pathname.startsWith('/owner/event-add/') && '이벤트/공지 작성하기'}
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn({
        [styles.header]: true,
        [styles['header--main']]: true,
      })}
    >
      <nav className={styles.header__content}>
        {isMobile ? (
          <MobilePanel />
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
                [styles.megamenu]: true,
                [styles['header__mega-menu']]: true,
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
                <Link to="/owner/modify-info">
                  정보수정
                </Link>
              </li>
              <li className={styles['header__auth-link']}>
                <button type="button" onClick={handleLogout}>
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
