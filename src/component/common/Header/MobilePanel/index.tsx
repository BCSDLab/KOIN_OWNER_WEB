import MobileLogoIcon from 'assets/svg/common/mobile-koin-logo.svg?react';
import MenuIcon from 'assets/svg/common/hamburger-menu.svg?react';
import BackArrowIcon from 'assets/svg/common/back-arrow.svg?react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'utils/ts/className';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { createPortal } from 'react-dom';
import { useLogout } from 'query/auth';
import usePrevPathStore from 'store/path';
import useMobileSidebar from 'component/common/Header/hooks/useMobileSidebar';
import useUserTypeStore from 'store/useUserTypeStore';
import { CATEGORY_OWNER, HeaderCategory } from 'utils/constant/category';
import useSuspenseUser from 'utils/hooks/useSuspenseUser';
import ROUTES from 'static/routes';
import styles from './MobilePanel.module.scss';

interface Prop {
  hideSidebar: () => void;
  category: HeaderCategory;
}

function PanelContent({ hideSidebar, category }: Prop) {
  const { title, submenu } = category;

  return (
    <div>
      <div className={styles.category__title}>
        {title}
      </div>
      <ul className={styles.category__submenus}>
        {submenu.map((subMenu) => (
          <li
            key={subMenu.title}
            className={styles.category__submenu}
          >
            <Link to={subMenu.link} onClick={hideSidebar}>
              {subMenu.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MobilePanel() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMobile } = useMediaQuery();
  const { data: user } = useSuspenseUser();

  const { setPrevPath } = usePrevPathStore((state) => state);
  const { logout } = useLogout();
  const { userType } = useUserTypeStore();

  const targetCategory = userType === 'OWNER' ? CATEGORY_OWNER : [];

  const {
    isExpanded: isMobileSidebarExpanded,
    expandSidebar,
    hideSidebar,
  } = useMobileSidebar(pathname, isMobile);

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => {
        setPrevPath(ROUTES.Login());
        navigate(ROUTES.Login());
      },
    });
  };
  return (
    <>
      <div
        className={styles['mobile-header']}
      >
        <span className={styles['mobile-header__title']}>
          {pathname === ROUTES.Owner.Root() ? (
            <MobileLogoIcon title="코인 로고" />
          ) : (targetCategory
            .flatMap((categoryValue) => categoryValue.submenu)
            .find((subMenuValue) => subMenuValue.link === pathname)
            ?.title ?? ''
          )}
        </span>
        <button
          title="메뉴 버튼"
          className={cn({
            [styles['mobile-header__icon']]: true,
            [styles['mobile-header__icon--right']]: true,
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
            [styles['mobile-header__panel']]: true,
            [styles['mobile-header__panel--logged-in']]: true,
            [styles['mobile-header__panel--show']]: isMobileSidebarExpanded,
          })}
          >
            <div className={styles['mobile-header__user']}>
              <button
                title="뒤로 가기 버튼"
                className={styles['mobile-header__backspace']}
                type="button"
                onClick={hideSidebar}
              >
                <BackArrowIcon title="뒤로 가기 버튼" />
              </button>
              <div className={styles['mobile-header__greet']}>
                {user?.name}
                <span>님, 안녕하세요!</span>
              </div>
              <ul className={styles['mobile-header__auth-menu']}>
                <li className={styles['mobile-header__my-info']}>
                  <Link to={ROUTES.Owner.ModifyInfo()}>
                    내 정보
                  </Link>
                </li>
                <li className={styles['mobile-header__link']}>
                  <button type="button" onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>

            {targetCategory.map((category: HeaderCategory) => (
              <PanelContent
                key={category.title}
                hideSidebar={hideSidebar}
                category={category}
              />
            ))}

            <img
              className={cn({
                [styles['mobile-header__logo']]: true,
                [styles['mobile-header__logo--bcsd']]: true,
              })}
              src="http://static.koreatech.in/assets/img/ic-bcsd_gray.png"
              alt="bcsd lab logo"
              title="bcsd lab logo"
            />
            <img
              className={cn({
                [styles['mobile-header__logo']]: true,
                [styles['mobile-header__logo--koin']]: true,
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
  );
}
